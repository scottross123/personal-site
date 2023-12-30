#!/bin/bash

REGISTRY=registry.tipoca.city
IMAGE=hugo-blog
TAG=latest

# TODO maybe grab commit hash too?
hugo --minify
docker build -t ${REGISTRY}/${IMAGE}:${TAG} .
docker push ${REGISTRY}/${IMAGE}:${TAG}
