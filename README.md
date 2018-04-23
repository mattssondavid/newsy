# Easy access the WordPress docker image
`docker exec -it $(docker ps -a | grep wordpress | awk '{print $1}') bash`

# Mime type to properly serve .mjs files over Apache
Edit `/etc/mime.types` on `application/javascript                          js` by adding mjs as a mime for application/javascript. Replace above application line to:
`application/javascript                          js mjs`

Correcting the mime types available will fix the error in Chrome: ```Failed to load module script: The server responded with a non-JavaScript MIME type of "". Strict MIME type checking is enforced for module scripts per HTML spec.```

One easy fix to update the mime types is to use the `AddType` command in the .htaccess-file. This can easily be done by executing `docker exec -ti $(docker ps -a | grep wordpress | awk '{print $1}') bash -c "/bin/echo 'AddType application/javascript .js .mjs' >> /var/www/html/.htaccess"`
