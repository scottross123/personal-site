+++

title = "Homebrewing a Debian Linux Router, Part 2"
linkTitle = "Homebrewing a Debian Linux Router, Part 2"
description = "Learning networking the hard way"
draft = true
tags = ["networking", "homeserver"]

+++

### Wi-Fi

To get Wi-Fi, I first attempted to use [`hostapd`](https://w1.fi/hostapd/) to create a wireless hotspot from , as well as a normal Wi-Fi card once I got one. After setting it up though I realized this was the wrong approach and that neither of these devices are designed to be wireless access points (the range and speeds were both terrible). So instead I order a cheap TP Link Wireless Router which I flash with [OpenWRT]() and use exclusively as a WAP. I will talk more about OpenWRT later.

#### `hostapd`

**I do not recommend is approach, you should get a separate Wireless Access Point.** But I'll include it anyway to include what I learned about Wi-Fi and maybe it'll work in a pinch if you have a better Wi-Fi card than I did. 

First I attempted this with a TP Link USB adapter which did not end up working.

`sudo apt install hostapd`

Edit `/etc/default/hostapd` and uncomment the `DAEMON_CONF` line. Set it to `DAEMON_CONF=/etc/hostapd/hostapd.conf`

Copy over the example configuration `cp /usr/share/doc/hostapd/examples/hostapd.conf /etc/hostapd/`

Get the driver in use for the adapter using `lsusb -t` (My device is a Realtek Semiconductor Corp. RTL8188EUS 802.11n Wireless Network Adapter)

`hw_mode: what IEEE 802.11`, which is just the standard protocol for Wi-Fi, hostapd will operate on
`channel`: a specific frequency within 2.4-5 Ghz the access point will operate on. You should pick one that will interfere with other networks the least. 

Right now I am going to use WPA2 because it will be easiest but later I will look into WPA3 support, probably after getting a wireless card for my device.

Currently I am using WPA2 but will definitely look into WPA3 in the future. If you don't know WPA3 is just the most modern and secure Wi-Fi protocol.

wpa_pairwise is needed for WPA1 and WPA2
rsn_pairwise is needed for WPA2 only

TKIP is less secure but included for backwards compatible for devices that do not support CCMP,

You can use `macaddr_acl` to ban devices by MAC address.

So, I could not get the TP Link USB adapter to work with hostapd. It appeared to be a driver issue. Instead of hunting for drivers I decided to install an old Intel 7265 Wi-Fi- I had lying around. I didn't have external antennas so I taped them to the roof of the chassis. Then I ran into more issues. First, the card did not show up as an interface after running `ip -c link`, but I could see it in `lspci`. After investigating `dmesg` I found out this was due to an error: `nable to change power state from D3cold to D0, device inaccessible `

To fix this i added `'pcie_port_pm=off` to the grub boot parameters. I also had to install the `firmware-iwifi` package. The interface now appears as `wlp3s0`.

So like I said previously, none of this ended up being worth it because the range and speeds on the wireless network were awful. I am sure this would be better if you had actual external Wi-Fi anetennas, which I did not, but instead of tesitng with this I decided it would be better to just get a separate device to use as an access point, and as a bonus mess around with OpenWRT. So I bought a TP Link C7 Archer Router (v5) to serve this purpose. It is extremely simple to flash with OpenWRT, and also very cheap (I got mine for $25), which are two main reasons why I picked it.

#### OpenWRT

[OpenWRT](https://openwrt.org) is a FOSS Linux distro for routers. Typically is targets embedded devices like wireless routers but you can also install it on x86_64. In fact, rather than setting up everything from scratch like I am you could just install OpenWRT on a thin client and use that instead. But as the title says I wanted to do this the hard way so I did not use OpenWRT for my actual router.

Why not stick with the stock firmware? Because I wanted to learn about OpenWRT and preferred to have a regular Linux device which I control instead of the lock-downed factory OS I have no insight into. You might get faster speeds sticking with the stock firmware.

[Quick Start](https://openwrt.org/docs/guide-quick-start/start)

[Device Page for my Router](https://openwrt.org/toh/tp-link/archer_c7)

The basic process is the following: 

1. Go to https://firmware-selector.openwrt.org/ and search for your device
2. [TP-Link Archer C7 v5](https://firmware-selector.openwrt.org/?version=23.05.2&target=ath79%2Fgeneric&id=tplink_archer-c7-v5)
3. it is very import to verify the download. **If the download it is incomplete or corrupt somehow, you may brick your device.**
4. Verify with `sha56sum`
5. Rename file to `firmware.bin`
6. upgrade the firmware manually and select the firmware.bin file
7. Wait
8. Once it is finished and the page can no longer be found, reboot the router
9. Wait 
10. Go to 192.168.1.1 and everything should be ready to go.
11. Log in as root (there is no password set)

[Turning on wireless](https://openwrt.org/docs/guide-quick-start/walkthrough_wifi)

**Plug the router into the LAN port of the C7 Archer**

1. Go to network -> wireless and enable Wi-Fi with WPA2 encryption.
2. Set your Wi-Fi password (key) to something secure.
3. Set a country code.
4. Also after setting this up you can access the OpenWrt router at [openwrt.lan](openwrt.lan) instead of the ip address.
5. Go to network -> interfaces and set a static IP address that makes sense.
6. Change the gateway and DNS server to the IP of the router.
7. Disable DHCP by setting ignore interface, and disable all of IPv6 DNS settings

These steps were to just provide an overview of the process. If you are flashing OpenWRT, **you should read the documentation and guides on openwrt.org throughly and follow those. I wasted a lot of time setting this up the first time because I did not read the documentation in its entirety (I used the WAN port instead of LAN when first setting this up and ran into a ton of problems.)**

### Ethtool

To get gigabit ethernet speeds to work, I had to install `ethtool`.

`sudo apt install ethtool`

`ethtool <INTERFACE>` to get info on an.

`sudo ethtool -s <INTERFACE> autoneg on speed 1000 duplex full` to fix speeds.

`ip link set dev <INTERFACE> up` to bring the device up.

s

### Wireguard

I want to use wireguard for remote access into my network

Follow instructions in [wireguard.md].

After writing configuration files,

`systemctl enable wg-quick@wg0` is used to enable the wireguard service

### Domains

Inside the dnsmasq config, add

`address=/.tipoca.city/172.16.0.22`

This will redirect the domain `tipoca.city` and all subdomains to `172.16.0.22` (the local ip address of my server)

### DNSMasq Ad Blocking

I'm using StevenBlack's list, which I believe is the defualt adlbock list for PiHole. I created an `/etc/blocklists` directory to keep host files for hosts i want to block. I then include these files in my dnsmasq configuration with `add-hosts=/etc/blocklists/stevenblack`


### Sources

- [Ars Technica](https://arstechnica.com/gadgets/2016/04/the-ars-guide-to-building-a-linux-router-from-scratch/) (check this article out, it was my initial inspiration for this project)
- [Internet Sharing Arch Wiki](https://wiki.archlinux.org/title/Internet_sharing) 
- [Router Arch Wiki](https://wiki.archlinux.org/title/Router)



# ethtool

ource: https://phoenixnap.com/kb/ethtool-command-change-speed-duplex-ethernet-card-linux
