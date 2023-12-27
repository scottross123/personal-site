+++

title = "How I Backup My System using Borg"
description = "How I backup my systems using Borg"
date = 2023-09-29
[taxonomies]
tags = ["backups", "linux"]

+++

You can checkout the repository for this script on [GitLab](https://gitlab.com/swr2112/local-borgbackup).

This is a brief overview of how I backup my Linux computers to an external hard drive using borg. Check out the [documentation](https://borgbackup.readthedocs.io/en/stable/index.html) for more information.

Also checkout the manpages by running `man borg`

## What is Borg?

Borg is a de-duplicating backup program for Unix-like operating systems including, Linux, macOS, and the BSDs. It is written in Python, and able to encrypt your backups, and compress them so they don't take nearly as much space as a typical rsync backup.

## Overview

First, run:

`borg init --encryption=repokey /path/to/repo`

to initialize a borg repository.

There are two options for `--encryption`: repokey and keyfile.

This option is specifying where the encryption key will be stored. When using `repokey`, the key will be stored in the repository, meaning you will only need a passphrase to decrypt your backup. If keyfile is chosen, then the keyfile will be stored externally, in the `~/.config/borg` directory by default. You will have to supply this keyfile as well as the passphrase to access the repository. 

Regardless of which option you choose, it is reccomended to backup this key somewhere <u>separate</u> from your borg repository. If you choose repokey you can export your keyfile using `borg export`.

Initially I was using keyfile encryption for all my backups, but I ultimately decided that this was over-doing it when I am just backing up to an external hard drive that never leaves my room. But I do think using an external keyfile is a good idea when backing up to a computer or device you do not have physical control over, such as a VPS in the cloud.

So to setup my Borg repositories for my computers, I first mount the hard drive by running:

`sudo mkdir /mnt/backups`

`sudo mount /dev/<device> /mnt/backups`

Next to initialize the repository, I run:

`borg init --encryption=repokey /mnt/backups/<hostname>.borg`

If you get a gross python error message you probably need to run the command with `sudo`. If you are trying to backup your whole system or multiple users, you will need to run Borg as root. If you are only backing up your own files, you should not need to.

Cool! So now you can create an archive by running:

`borg create /path/to/repo::archive-name directory-to-backup`

Use `borg mount` and `borg extract` for restoring backups.

For backups to automatically start when I plug in my external hard drive, I use a script based on [this guide](https://borgbackup.readthedocs.io/en/stable/deployment/automated-local.html) from the official Borg docs.

I have three primary scripts inside `/etc/backups`: `run.sh`, `pre-backup.sh`, and `post-backup.sh`

The main script is `run.sh`, this is what actually performs the backups. It looks like this:

```bash
#!/bin/bash

# The udev rule is not terribly accurate and may trigger our service before
# the kernel has finished probing partitions. Sleep for a bit to ensure
# the kernel is done.
#
# This can be avoided by using a more precise udev rule, e.g. matching
# a specific hardware path and partition.
sleep 5

# The backup partition is mounted there
MOUNTPOINT=/mnt/backups

# This is the location of the Borg repository
TARGET="$MOUNTPOINT/$(hostname).borg"

# Archive name schema
DATE=$(date --iso-8601)-$(hostname)

# This is the file that will later contain UUIDs of registered backup drives
DISKS=/etc/backups/backup.disks

# Find whether the connected block device is a backup drive
for uuid in $(lsblk --noheadings --list --output uuid)
do
        if grep --quiet --fixed-strings $uuid $DISKS; then
                break
        fi
        uuid=
done

if [ ! $uuid ]; then
        echo "No backup disk found, exiting"
        exit 0
fi

echo "Disk $uuid is a backup disk"
partition_path=/dev/disk/by-uuid/$uuid
# Mount file system if not already done. This assumes that if something is already
# mounted at $MOUNTPOINT, it is the backup drive. It won't find the drive if
# it was mounted somewhere else.
(mount | grep $MOUNTPOINT) || mount $partition_path $MOUNTPOINT
drive=$(lsblk --inverse --noheadings --list --paths --output name $partition_path | head --lines 1)
echo "Drive path: $drive"

BORG_OPTS="--stats --progress --one-file-system --compression lz4 --checkpoint-interval 86400"

export BORG_PASSCOMMAND="cat /root/.borg-passphrase"

# No one can answer if Borg asks these questions, it is better to just fail quickly
# instead of hanging.
export BORG_RELOCATED_REPO_ACCESS_IS_OK=no
export BORG_UNKNOWN_UNENCRYPTED_REPO_ACCESS_IS_OK=no

# Log Borg version
borg --version

if [ -f /etc/backups/pre-backup.sh ]; then
  echo "Running pre-backup script"
  /etc/backups/pre-backup.sh
fi

echo "Starting backup for $DATE"

# system
borg create $BORG_OPTS \
  --exclude root/.cache \
  --exclude var/lib/docker/devicemapper \
  --exclude home \
  --exclude proc \
  --exclude dev \
  --exclude sys \
  --exclude tmp \
  $TARGET::$DATE-$$-system \
  / /boot

# /home 
borg create $BORG_OPTS \
  --exclude 'sh:home/*/.cache' \
  $TARGET::$DATE-$$-home \
  /home/

echo "Completed backup for $DATE"

# Just to be completely paranoid
sync

if [ -f /etc/backups/post-backup.sh ]; then
   echo "Running post-backup script"
   /etc/backups/post-backup.sh
fi

if [ -f /etc/backups/autoeject ]; then
  umount $MOUNTPOINT
  hdparm -Y $drive
fi
```

Before the backup begins, `run.sh` calls the `pre-backup.sh` script if it exists. This script is optional and intended to perform any pre-backup tasks. This could be shutting down running virtual machines and containers (it is not recommended to perform a backup while VMs are running), take snapshots of those VMs, dump databases, send a notification through email, and etc.

```bash
#!/bin/sh

echo "Stopping virtual machines (libvirtd)"
systemctl stop libvirtd

echo "Pre backup check"
```

`post-backup.sh` performs similar tasks after the backup is complete. This might be starting up VMs again or sending a notification that the backup is complete.

```bash
#!/bin/sh

echo "Starting virtual machines again"
systemctl start libvirtd

echo "Post backup check"
```

To get the script to run when your hard drive is plugged in, you need to get the uuid of the hard drive. You can get this by running `lsblk -o+uuid,label`. After you have the uuid, add it to the `backup.disks` file.

The presence of the `autoeject` file will automatically eject the hard drive when the backup is complete.

I also have an `./install.sh` script which copy all the files from the `backups` dir to /etc directory.

After setup, `umount` and reconnect the drive, and the automatic backup service should start.

Thanks for reading, hope this was helpful!

## References

- [https://borgbackup.readthedocs.io/en/stable/deployment/automated-local.html](https://borgbackup.readthedocs.io/en/stable/deployment/automated-local.html)
