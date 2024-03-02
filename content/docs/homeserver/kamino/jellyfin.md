+++
title = "Jellyfin"
+++

[Jellyfin](https://jellyfin.org/) is an awesome FOSS alternative to Plex for your local media. The server and web UI can be deploy through docker or directly on the host, and there are a variety of clients for Linux, macOS, Windows, Android, iOS, tvOS, and etc.

**add some more info about jellyfin**

## Clients

For Linux I use the official desktop client [Jellyfin Media Player](https://github.com/jellyfin/jellyfin-media-player) which can be installed either for your distrubtions package manager (it's should be in the apt repository if you're on Debian or Ubuntu and the AUR on Arch) or as a [Flatpak](https://flathub.org/apps/com.github.iwalton3.jellyfin-media-player).

For iOS I use Swiftin rather than the official Jellyfin Mobile, which is written in Swift instead of React Native, which I find to be much more perfomant and has a nicer UI than the official app. Note though the Swiftin App only works for tv shows and movies and not your music or books. I don't actually watch movies on my phone though, I just have just have the app on my phone for testing purposes and to make sure my media is showing up.

On tvOS there is also a Swiftin version but I have found it significantly more buggy and less polished than the mobile version. There is no official client for the Apple TV. Infuse is a recommended third party client that works on the Apple TV, but I have not tried it myself so I can't give any information on that

## Docker Compose

```yaml
volumes:
  jellyfin:
  jellyfin-cache:
  jellyseerr:

networks:
  proxy:
    external: true

services:
  # double check if this needs to be in the servarr network
  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
      - UMASK=002
    volumes:
      - jellyfin:/config
      - jellyfin-cache:/cache
      - /mnt/data/media:/media
    ports:
      - 8096:8096
    networks:
      - proxy     
    restart: 'unless-stopped'
```
