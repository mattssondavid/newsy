# Easy access the WordPress docker image
`docker exec -it $(docker ps -a | grep wordpress | awk '{print $1}') bash`

# Enable the dev site at URL `this.dev`
Edit your host file with:
```
# this.dev -- Docker Apache HTTP server with SSL support
127.0.0.1	this.dev
```
