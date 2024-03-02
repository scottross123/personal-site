+++
title = "Nextcloud"
+++

[Nextcloud](https://nextcloud.com/) is a popular self-hosted and collaboration and file syncing platform that is essentially like an open-source and privacy concious version of the cloud storage/collaboration offerings from companies like Microsoft and Google. They provide offerings for both enterprises and the community.

Nextcloud comes with a ton of stuff and might be overkill if you are just hosting for yourself and maybe a friend. I still like it though, and use it mainly for the CardDAV and CAlDav features for a self hosted calendar, address book, and reminders, as well as some file syncing.

## Nextcloud All-In-One

For deploying Nextcloud I use [Nextcloud AIO](https://github.com/nextcloud/all-in-one) docker container which is now the officially recommended way to install it. It makes deployment, maintenance, and updates of Nextcloud and all its add-ons like [Nextcloud Talk](https://nextcloud.com/talk/) and [Nextcloud Office / Collabora](https://www.collaboraoffice.com/). It also includes a backup solution using [BorgBackup](https://www.borgbackup.org/) and antivirus using [ClamAV](https://www.clamav.net/). 

The Nextcloud AIO master container hooks into the host's `/var/run/docker.sock` and creates/destroys containers as needed for Nextcloud. All other containers are optional and be turned off or on from the AIO interface. 

### Using a Local IP Address and a Reverse Proxy

I needed to add  `SKIP_DOMAIN_VALIDATION=true` as an environment variable to skip domain validation so I could get this working with a domain pointing at my server's local ip address. If your setup is like mine this will be necessary.

### A Note about Nextcloud AIO and Nextcloud Office / Collabora

For the life of me I could not get the Collabora container that comes with Nextcloud AIO to work. I followed the documentation for a reverse proxy setup with Nginx Proxy Manager, enabled websockets, followed the recommendations in [this](https://github.com/nextcloud/all-in-one/discussions/1358) GitHub discussion from the lead developer, but still got the same sockets error trying to open any office document in Nextcloud.

After hours trying to figure this out, the solution ended up being to give up on the collabora container that comes with Nextcloud AIO and setup a separate collabora/code container in the same stack. I disabled Collabora in the Nextcloud AIO interface, added the collabora/code container to my compose file, setup a proxy host in NPM for Collabora with websockets enabled, installed the Nextcloud Office app on my Nextcloud instance and configured it to use the Collabora container I setup outside of Nextcloud AIO. Then everything worked perfectly.

I am confident I had setup everything correctly with Nextcloud AIO but can not be certain this is due to a bug or me just being an idiot user. However, if you are having issues with Nextcloud Office and Collabora I recommend not wasting as much time as me and just disabling the Nextcloud AIO Collabora container, setting up a Collabora container outside of AIO and using that instead.

There might be similar issues with Nextcloud Talk since that also relies on websockets, but I have not tested it.

## Nextcloud Apps

Nextcloud comes with an app store that allows you add extensions for virtually anything such as recipe management, photos, health tracking, password managers, and so on. However, I would caution against trying to use Nextcloud for everything. I found a lot of that apps have limited features or are still development, and you get much better value using standalone solutions instead of what the apps offer.

## Nextcloud Calendar vs Radicale

I previously used [Radicale](https://radicale.org/v3.html) for my calendar but ran into constant issues getting it to work with Thunderbird. Every time I opened Thunderbird it would loose the ability to read/write to the calendar and I would have to re-add it. I switched to Nextcloud and now it works perfectly.

## Docker Compose

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/nextcloud/compose.yaml)

```yaml
---
services:
  # see above for why I use a separate Collabora container
  collabora:
    image: collabora/code
    restart: 'unless-stopped'
    ports:
      - 9980:9980
    environment:
      - extra_params=--o:ssl.enable=false
    networks:
      - proxy

  nextcloud-aio-mastercontainer:
    image: nextcloud/all-in-one:latest
    init: true
    restart: 'unless-stopped'
    container_name: nextcloud-aio-mastercontainer 
    volumes:
      - nextcloud_aio_mastercontainer:/mnt/docker-aio-config 
      - /var/run/docker.sock:/var/run/docker.sock:ro 
    ports:
      - 8080:8080
    networks:
      - proxy
    environment: 
      - APACHE_PORT=11000 
      - APACHE_IP_BINDING=0.0.0.0 
      - BORG_RETENTION_POLICY=--keep-within=7d --keep-weekly=4 --keep-monthly=6 
      - SKIP_DOMAIN_VALIDATION=true
      - COLLABORA_SECCOMP_DISABLED=true 

volumes: 
  nextcloud_aio_mastercontainer:
    name: nextcloud_aio_mastercontainer 

networks:
  proxy:
    external: true
```
