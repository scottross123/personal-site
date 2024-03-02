+++
title = "Syncthing"
+++

[Syncthing](https://syncthing.net/) is cross platform (Windows, macOS, Linux, and BSD) P2P continuous file syncing application and probably just one of my favorite programs ever. I have a lot of different devices each with syncthing installed synchronize directories such as my Documents, dotfiles and KeePass database, so switching between devices is completely seamless and I can pick up where I left off easily.

I keep a containerized instance of Syncthing running on my server for redundancy to ensure there are no sync conflicts between devices as long as that device can reach my server.

Make sure to allow ports 22000 tcp/udp for file transfer and 21027 for device discovery on **all** of your devices with Syncthing installed.

- [Docs](https://docs.syncthing.net/intro/getting-started.html)
- [GitHub](https://github.com/syncthing/syncthing)

## Syncthing vs Nextcloud for File Syncing

Nextcloud is another popular option for file syncing. Personally I use both but for different purposes. I use Syncthing for stuff I want to be always and instantly available on any device, like my password manager or a document I'm working on, so switching device is totally seamless. I use Nextcloud for notes and currently photos. If I had to pick one though I'd say syncthing, and I think it's the best option if you don't want everything Nextcloud has to offer.

## Docker Compose

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/syncthing/compose.yaml)

```yaml
---
networks:
  proxy:
    external: true

services:
  syncthing:
    image: syncthing/syncthing
    container_name: syncthing
    hostname: kamino
    environment:
      - puid=1000
      - pgid=1000
    volumes:
      - /srv/sync:/var/syncthing
    ports:
      - 8384:8384 # web ui
      - 22000:22000/tcp # tcp file transfers
      - 22000:22000/udp # quic file transfers
      - 21027:21027/udp # receive local discovery broadcasts
    networks:
      - proxy
    restart: 'unless-stopped'
```



