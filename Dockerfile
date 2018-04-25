FROM wordpress:latest

# Add SSL support
RUN apt-get update && \
	apt-get install -y  --no-install-recommends ssl-cert && \
	rm -r /var/lib/apt/lists/* && \
	a2enmod ssl && \
	a2ensite default-ssl
RUN service apache2 restart

WORKDIR /var/www/html

# Add support for Javascript Modules (.mjs)
#RUN /bin/bash -c 'echo "AddType application/javascript .js .mjs" >> /var/www/html/.htaccess'
