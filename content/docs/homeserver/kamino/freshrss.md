+++

title = "FreshRSS"

+++

[FreshRSS](https://github.com/FreshRSS/FreshRSS) is a self-hostable news aggregator. I've been using RSS more and more recently and I love it. It is a fantastic minimal and distraction-free way to keep up with the news I care about while avoiding the addictive and ad-ridden social media doomscroll most people use to get the news.

## Comparison with Miniflux

In the past I've tried [Miniflux](https://miniflux.app/) which is also great but I had trouble getting it to run the second time I tried it due to issues connecting to the Postgres database. I eventually decided it wasn't worth it and tried FreshRSS which worked immediately. FreshRSS let me just use sqlite, which is fine for me since I am the only user of this instance. You can also use Postgres or other databases with FreshRSS, but for Miniflux you must use postgres.

I like Miniflux's minimal UI a bit better but again it was just not worth the time for me to try and get it working versus FreshRSS which just worked without problem.

## Docker Compose 

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/freshrss/compose.yaml)

```yaml
---
networks:
  proxy:
    external: true

# using sqlite because it's easy
volumes:
  data:
  extensions:

services:
  freshrss:
    image: freshrss/freshrss
    restart: unless-stopped
    volumes:
      - data:/var/www/FreshRSS/data
      - extensions:/var/www/FreshRSS/data
      - ./config.custom.php:/var/www/FreshRSS/data/config.custom.php
      - ./config-user.custom.php:/var/www/FreshRSS/data/config-user.custom
    environment:
      TZ: America/New_York
      CRON_MIN: '2,32'
    networks:
      - proxy
`


