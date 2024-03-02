+++
title = "Plausible"
+++

[Plausible](https://plausible.io/) is an open source, self-hostable, and privacy respecting alternative to Google Analytics. It provides a simple and easy to use interface and uses a JS script much smaller and light than Google Analytics. Cookies are not used and personal data is not collected so you don't need any cookie banner or GDPR consent. I use Plausible to collect [analytics](https://scottross.dev/privacy) for this website.

## Docker Compose

*Note* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/plausible/compose.yaml)

```yaml
---
volumes:
  db-data:
    driver: local
  event-data:
    driver: local

services:
  mail:
    image: bytemark/smtp
    restart: 'unless-stopped'
    network_mode: 'container:public'

  plausible_db:
    image: postgres:14-alpine
    restart: 'unless-stopped'
    volumes:
      - db-data:/var/lib/postgresql/data
    network_mode: 'container:public'
    environment:
      #- POSTGRES_PASSWORD_FILE=/run/secrets/postgres-password
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

  plausible_events_db:
    image: clickhouse/clickhouse-server:23.3.7.5-alpine
    restart: 'unless-stopped'
    volumes:
      - event-data:/var/lib/clickhouse
      - ./clickhouse/clickhouse-config.xml:/etc/clickhouse-server/config.d/logging.xml:ro
      - ./clickhouse/clickhouse-user-config.xml:/etc/clickhouse-server/users.d/logging.xml:ro
    network_mode: 'container:public'
    ulimits:
      nofile:
        soft: 262144
        hard: 262144

  plausible:
    image: plausible/analytics:v2.0
    restart: 'unless-stopped'
    command: sh -c "sleep 10 && /entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"
    depends_on:
      - plausible_db
      - plausible_events_db
      - mail
        #ports:
        #- 8023:8023
    network_mode: 'container:public'
    env_file:
      './.env'
```

