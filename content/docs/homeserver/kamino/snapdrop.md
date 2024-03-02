+++
title = "Snapdrop"
+++

[Snapdrop](https://github.com/RobinLinus/snapdrop) is a local file sharing app heavily inspired by Apple's AirDrop. It can be installed as a PWA. Note this requires WebRTC to be enabled in your browser and it will not work without it.

## Docker Compose 

*Note* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/snapdrop/compose.yaml)

```yaml
---
networks:
  proxy:
    external: true

volumes:
  config:

services:
  snapdrop:
    image: lscr.io/linuxserver/snapdrop:latest
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - config:/config
    networks:
      - proxy
    restart: 'unless-stopped'
```
