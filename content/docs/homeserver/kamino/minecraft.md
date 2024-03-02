+++
title = "Minecraft"
+++

I use itzg's [Docker Minecraft Server](https://docker-minecraft-server.readthedocs.io/en/latest/) to run a Minecraft server. It is highly configurable and you can run any flavor of Minecraft server you want like [PaperMC](https://papermc.io/), or with modloaders like [Forge](https://forums.minecraftforge.net/) and [Fabric](https://fabricmc.net/). 

## RCON

RCON is a web administration tool for game servers itzg also provides a container though, however the upstream project is no longer support. I have not done any research into an alternative yet.

## Docker Compose 

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/minecraft/compose.yaml)

```yaml
---
# https://github.com/itzg/docker-minecraft-server

# https://minecraft.fandom.com/wiki/Formatting_codes

# TODO add a creative  server

networks:
  proxy:
    internal: true

services:
  mc:
    image: itzg/minecraft-server
    ports:
      - 25565:25565
    stdin_open: true
    volumes:
      - /srv/minecraft/data:/data
    environment:
      EULA: "TRUE"
      VERSION: "LATEST"
        #TYPE: "PAPER"
      MOTD: "Minecraft Survival Server on Kamino"
      DIFFICULTY: "NORMAL"
      # WHITELIST: 
      # OPS: 
      # ICON: "./icon.png"
      MAX_PLAYERS: 999
      ENABLE_COMMAND_BLOCK: "TRUE"
      SNOOPER_ENABLED: "FALSE"
      TZ: US/Eastern
      LOG_TIMESTAMP: "TRUE"
      restart: 'unless-stopped'

   # no longer supported
  web:
    image: itzg/rcon
    environment:
      # CAHNGE SOON< THIS VERY BAD
      RWA_USERNAME: admin
      RWA_PASSWORD: admin
      RWA_ADMIN: "TRUE"
      RWA_RCON_HOST: mc
      # needs to match the password configured for the container, which is 'minecraft' by default
      RWA_RCON_PASSWORD: ${RCON_PASSWORD}
    ports:
      # web ui
      - 4326:4326
      # websocket access
      - 4327:4327        
    networks:
      - proxy
    restart: 'unless-stopped'
  
  backups:
    image: itzg/mc-backup
    environment:
      BACKUP_INTERVAL: "2h"
      RCON_HOST: mc
    volumes:
      - /srv/minecraft/data:/data:ro
      - /srv/minecraft/backups:/backups    
    networks:
      - proxy
    restart: 'unless-stopped'
```
