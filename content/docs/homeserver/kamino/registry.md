+++
title = "Registry"
+++

I host a docker registry just for a few private images like the one for this site.

## Docker Compose

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/registry/compose.yaml)

```yaml
---
# TODO add registry credentials
networks:
  proxy:
    external: true

services:
  registry:
    image: registry:latest
    ports:
      - 5000:5000
    networks:
      - proxy
    restart: 'unless-stopped'
```
