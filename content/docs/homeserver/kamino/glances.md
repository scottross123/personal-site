+++
title = "Glances"
+++

[Glances](https://nicolargo.github.io/glances/) cool htop/top like system monitor that as both a web and CLI UI, as well as an API. It can be deployed pretty easily using docker.

You can also password protect the web interface.

[Github Repo](https://github.com/nicolargo/glances)

## Docker Compose 

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/glances/compose.yaml)

```yaml
---
networks:
  proxy:
    external: true

services:
  glances:
    image: nicolargo/glances:latest
    restart: always
    environment:
      # TODO password protection maybe?
      - "GLANCES_OPT=-w"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      # Uncomment the below line if you want glances to display host OS detail instead of container's
      - /etc/os-release:/etc/os-release:ro
    pid: host    
    networks:
      - proxy
    ports: 
      - 61208:61208
```
