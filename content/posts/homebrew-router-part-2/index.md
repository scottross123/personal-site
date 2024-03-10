+++
title = "Homebrewing a Debian Linux Router, Part 2"
linkTitle = "Homebrewing a Debian Linux Router, Part 2"
description = "AKA learning networking the hard way"
tags = ["networking", "homeserver"]
draft = true
+++

*I started off using dnsmasq but now use [Pi-Hole](https://pi-hole.net/), which uses a fork of `dnsmasq` under the hood. I have used Pi-Hole before and really always intended to use it again, I just wanted to also have a look at the tool it uses under the hood first.*


[`dnsmasq`](https://dnsmasq.org/doc.html) is a popular FOSS option for providing DNS and DHCP services to small networks (like mine). 

`sudo apt intall dnsmasq`

`dnsmasq` acts as forwarding DNS server, meaning it technically is not doing the DNS lookups itself but instead forwarding the requests to an upstream provider. For myself I chose [Quad9](https://quad9.org/), a privacy-focused DNS provider based in Switzerland.

If you want to talk to the authoritative name servers directly and not rely on a third-party provider, you need to setup a recursive DNS server like [unbound](https://www.nlnetlabs.nl/projects/unbound/about/). I currently do not have unbound setup but plan to and will talk about it in another post.

My `dnsmasq` config:

```ini
# Stop dnsmasq from reading /etc/resolv.conf for no reason
no-resolv

# Quad9 
server=9.9.9.9

cache-size=10000

# dhcp
dhcp-authoritative
dhcp-range=br0,172.16.0.2,172.16.0.100,12h

# This will redirect the domain `my.domain` and all subdomains to `172.16.0.22` (the local ip address of my server)
address=/.my.domain/172.16.0.22
```
Now all my laptops receive a IP address when connect to my router directly through ethernet, and can ping each other as well as the router.

#### Ad Blocking

I'm using StevenBlack's list, which I believe is the defualt adlbock list for PiHole. I created an `/etc/blocklists` directory to keep host files for hosts i want to block. I then include these files in my dnsmasq configuration with `add-hosts=/etc/blocklists/stevenblack`

### Conclusion

That's all for now. In the next post I will talk about what I did to get Wi-Fi, and in later posts I will talk about setting up dnsmasq for DNS and DHCP, a Wireguard server, Pi-Hole, Unbound, and OpenVPN.

### References

- [Ars Technica](https://arstechnica.com/gadgets/2016/04/the-ars-guide-to-building-a-linux-router-from-scratch/) (check this article out, it was my initial inspiration for this project)
- [Router Arch Wiki](https://wiki.archlinux.org/title/Router)
-
