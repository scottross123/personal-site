+++
title = "Nginx Proxy Manager"
+++

One of the most popular use cases for [nginx](https://nginx.org) is to use it as a reverse proxy. [Nginx Proxy Manager](https://nginxproxymanager.com/) (NPM) is simple a web frontend for this use case, allowing you to expose your services using a reverse proxy and comes with built in Let's Encrypt support for SSL / HTTPS. I can setup an nginx reverse proxy without it, but I use NPM simply for convience and ease of use, I have a lot of services running on my service and it helps to have a centralized interface to manage it all. It can also be deployed easily as a docker container.

## Docker Compose 

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/nginx-proxy-manager/compose.yaml)

```yaml
---
volumes:
  data:
  letsencrypt:

networks:
  proxy:
    external: true
  # nextcloud-aio creates its own network for its containers, so i need to ad it here
  nextcloud-aio:
    external: true

services:
  npm:
    image: 'jc21/nginx-proxy-manager:latest'
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - data:/data
      - letsencrypt:/etc/letsencrypt
    environment:
      # nextcloud AIO wants me to run the reverse proxy as root, TODO see if this is actually necessary (edit /etc/sysctl.conf)
      PUID: 0
      PGID: 0
    networks:
      - proxy
      - nextcloud-aio
    restart: 'unless-stopped'

```
