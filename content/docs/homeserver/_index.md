+++
title = "Home Server"
+++

Documentation and notes on my current home server setup.

## My Home What?

Home server. Or home lab? I'm not sure. It consists more than a single server, but I don't have any enterprise grade equipment, a server rack, 5 VLANs and 9 VMs, or anything crazy like that, just a few old PCs, so I'm not sure I feel confident enough to call it a home "lab". I might just be gatekeeping myself though (emoji).

## Why?

This all started upon be discovering [r/selfhosted](https://old.reddit.com/r/selfhosted) and really learning about Linux. The idea of running your own applications instead of relying on cloud services and learning about Linux along the way seemed awesome. So I bought an old ThinkCentre mini PC to get started.

Flash forward to now I have a Lenovo ThinkCentre M70s serving as my main home server running various Dockerized applications, my old 2018 Macbook Pro serving as a backup and [Bluebubbles]() server, a Dell Wyse 5070 Extended acting as a router, firewall, DNS, DHCP, and VPN server, and a TP Link Archer Router flashed with OpenWRT for now acting as a wireless access point.

I think setting up a home server is a great project for anyone in software engineering to learn more about the actual systems your applications run on. It's been fun and a great learning experience and I hope to only dig deeper and learn more.

That being said, this setup is very likely **not** not the most optimal setup. I still have plenty to learn and setup so expect changes and some services you might think are important missing. As I continue work on this I will come back and updated these pages.

## Overview

- Hardware
    - 1 x Lenovo ThinkCentre M70s
    - 1 x MacBook Pro 2018, 13inch
    - 1 x Dell Wyse 5070 Extended
    - 1 x RaspberryPi 3B
    - 1 x TP Link A7 Archer Router

- Services
    - Nginx Proxy Manager as a reverse proxy
    - Gitea for privately hosting git repositories
    - Jellyfin for media streaming
    - Nextcloud for calendar, contacts, and file storage/syncing
    - Syncthing for file syncthing
    - Wireguard for VPN
    - dnsmasq for DNS and DHCP services for LAN
    - Bluebubbles for iMessage on non-Apple devices
    - Plausible for privacy-respecting analytics
    - FreshRSS for RSS
    - Mealie for recipe management
    - and more...

## Source

You can check out the repository for my docker compose files on GitHub [here](https://github.com/scottross123/home-server) and GitLab [here](https://gitlab.com/swr2112/home-server).

