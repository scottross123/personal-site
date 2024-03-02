+++
title = "Watchtower"
+++

[Watchtower](https://containrrr.dev/watchtower/) is a container for updating other containers. It will automatically pull the latest version of the image for your running containers and restart them gracefully. It can also be configured with private registries.


## Docker Compose

*Note* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/watchtower/compose.yaml)

```yaml
---
networks:
  proxy:
    external: true

services:
  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - proxy

```



