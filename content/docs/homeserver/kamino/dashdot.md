+++
Title = "dash."
+++

[dash.](https://github.com/MauriceNino/dashdot) is a simple dashboard I use just to get a quick overview on my server and make sure everything is in working order form a glance. It also looks great on mobile.

add some pictures

## Docker Compose 

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/dashdot/compose.yaml)

```yaml
---
networks:
  proxy:
    external: true

services:
  dash:
    image: mauricenino/dashdot:latest
    restart: unless-stopped
    privileged: true
    volumes:
      - /:/mnt/host:ro
    environment:
      - DASHDOT_ENABLE_CPU_TEMPS=true
      - DASHDOT_PAGE_TITLE=Kamino
      - DASHDOT_ALWAYS_SHOW_PERCENTAGES=true
      - DASHDOT_USE_IMPERIAL=true
    networks:
      - proxy 
`
