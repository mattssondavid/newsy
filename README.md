# Easy access the WordPress docker image
`docker exec -it $(docker ps -a | grep wordpress | awk '{print $1}') bash`

# Enable the dev site at URL `this.localhost`
Edit your host file with:
```
# this.localhost -- Docker Apache HTTP server with SSL support
127.0.0.1	this.localhost
```

#### Notes of the URL why it's not `.dev`
The use of .dev in the URL will cause Chrome to behave weird as .dev is now
owned by Google and they have started using it. For more information see [this](https://iyware.com/dont-use-dev-for-development/)
