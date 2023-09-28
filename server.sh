#!/bin/sh

#sudo docker run -u "$(id -u):$(id -g)" -v $PWD:/app --workdir /app -p 8080:8080 ghcr.io/getzola/zola:v0.17.1 serve --interface 0.0.0.0 --port 8080 --base-url localhost
#docker run -u "$(id -u):$(id -g)" -v $PWD:/app --workdir /app -p 8080:8080 -p 1024:1024 ghcr.io/getzola/zola:v0.17.1 serve --interface 0.0.0.0 --port 8080 --base-url localhost
docker run -v $PWD:/app --workdir /app -p 8080:8080 -p 1024:1024 ghcr.io/getzola/zola:v0.17.1 serve --interface 0.0.0.0 --port 8080 --base-url localhost
