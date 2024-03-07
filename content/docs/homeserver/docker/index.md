+++
title = "Docker"
+++

Like many of self-hosted enthusiasts, I run my applications in Docker containers and orchestrate them using Docker Compose.

If you've found yourself here you probably already know what Docker is and the advantages that come with using it, but in case you don't:

[Docker Overview from Official Documentation](https://docs.docker.com/get-started/overview/)

Some Advantages of using Docker containers for application deployment:
- Isolation for each service and from each other and the host operating system. Each container gets its own operating system, file system, and network stack. This is great for security and stability of the system.
- Easy deployment and distribution. There are images for almost every application you might need for your home server, and Docker allows for consistent deployments regardless of the host system as long as you have docker installed.
- Docker containers are much more lightweight than VMs, your other option for isolating applications on a single host. This is because they share the same kernel as the host (assuming you are on a Linux system)

## Services I Host Using Docker
- [Gitea](/docs/homeserver/kamino/gitea)
- [Nextcloud](/docs/homeserver/kamino/nextcloud)
- [Minecraft](/docs/homeserver/kamino/minecraft)
- [Photoprism](/docs/homeserver/kamino/gitea)
- [Mealie](/docs/homeserver/kamino/mealie)
- [Plausible](/docs/homeserver/kamino/plausible)
- [Jellyfin](/docs/homeserver/kamino/jellyfin)
- [SearXNG](/docs/homeserver/kamino/searxng)
- [Syncthing](/docs/homeserver/kamino/syncthing)
