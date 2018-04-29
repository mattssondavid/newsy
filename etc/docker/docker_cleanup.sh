#!/bin/bash
# Code from: https://techoverflow.net/2013/10/22/docker-remove-all-images-and-containers/

# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)
