+++
title = "Mealie"
+++

[Mealie](https://docs.mealie.io/) is multi-user self-hosted recipe manager and meal planner that can import recipes from the majority of websites. I use it a lot to keep track of recipes and meal plan for the week. It works great on mobile as well.

## Mealie vs Tandoor

Originally I was using [Tandoor](https://tandoor.dev/). I quickly switched to Mealie though because I found it way more polished and also easier to use. But if for some reason you don't like Mealie you can give Tandoor a shot.

## Mealie vs Nextcloud Cookbook

[Nextcloud Cookbook](https://github.com/nextcloud/cookbook) can only import recipes that provide a [Recipe JSON Schema](https://schema.org/Recipe), the majority of sites I use don't so I couldn't import from them, so this was an immediate dealbreaker for me. The app is also not production ready.

## Docker Compose

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/mealie/compose.yaml)

```yaml
---
services:
  mealie:
    image: ghcr.io/mealie-recipes/mealie:v1.0.0 # 
    deploy:
      resources:
        limits:
          memory: 1000M # 
    volumes:
      - data:/app/data/
    environment:
    # Set Backend ENV Variables Here
      - ALLOW_SIGNUP=true
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
      - MAX_WORKERS=1
      - WEB_CONCURRENCY=1
      - BASE_URL=${BASE_URL}
    restart: unless-stopped
    networks:
      - proxy

volumes:
  data:

networks:
  proxy:
    external: true
```
