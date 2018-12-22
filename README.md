# Easy access the WordPress docker image
`docker exec -it $(docker ps -a | grep wordpress | awk '{print $1}') bash`

# Installation
## SSL
Before you create the Docker images you must create the files `rootCA.key` and `rootCA.pem`.
These files can be created by running the file `etc/ssl/create_root_cert.sh` on a system running openssl.
If you do not run the above Shell Script in the script's location folder, then move the rootCA-files into `etc/ssl/`. They are required to build the Docker images for enabling HTTPS.

## Docker
1. Build the required Docker images by running `docker-compose build`.
2. Start the Docker containers by running `docker-compose up`.

## Enable the dev site at URL `this.localhost`
Edit your system's host file with:
```
# this.localhost -- Docker Apache HTTP server with SSL support
127.0.0.1	this.localhost
```

### Notes of the URL why it's not `.dev`
The use of .dev in the URL will cause Chrome to behave weird as .dev is now
owned by Google and they have started using it. For more information see [this](https://iyware.com/dont-use-dev-for-development/)

## Activating SSL certificate in browsers to enable HTTPS on `this.localhost`
Add the file `rootCA.pem` in folder `etc/ssl` to your system's certificate manager in the section for `Trusted Root Certification Authorities`. This will enable the certificate created by the Docker build, signed by the `rootCA` files, used by Apache for SSL, to be trusted by your local system and thus enabling HTTPS support on the website.

# Theme installation
The WordPress theme is dependent on NPM. Install NPM dependencies by running `npm install` in the root git repository folder.

To "build" the theme run `npm build`.

## If unable to use `upload` in WordPress
WordPress has not access to the upload directory. In the container run `chown -R www-data:www-data wp-content/uploads/`
