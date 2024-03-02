+++
title = "SearXNG"
+++

[SearXNG](https://docs.searxng.org/) is a self-hosted privacy-respecting metasearch engine and fork of now no longer maintained project [SearX](https://github.com/searx/searx). Being a metasearch engine, SearXNG aggregates results from numerous search engines (Google, DuckDuckGo, Brave Search, Qwant, etc). It protects your privacy by mixing your queries with searches from other platforms and doesn't store any data. It can also e added to Firefox and Chromimum based browsers as a search engine by supporting OpenSearch.

## Docker Compose

*NOTE* if you want the most up-to-date version of this file, check out the [src](https://github.com/scottross123/home-server/blob/master/apps/searxng/compose.yaml)

```yaml
---
services:
  searxng:
    image: searxng/searxng
    volumes:
      - searxng:/etc/searxng
    environment:
      - BASE_URL=${BASE_URL}
      - INSTANCE_NAME=kamino
    networks:
      - proxy

volumes:
  searxng:

networks:
  proxy:
    external: true

```


