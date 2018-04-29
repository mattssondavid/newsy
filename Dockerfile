FROM wordpress:4.9.5-php7.2-apache

# https://this.localhost SSL
# Point your network hosts to: 127.0.0.1  this.localhost
COPY etc/ssl/create_new_cert.sh /root/
COPY etc/ssl/this.localhost.key /etc/ssl/certs/private/this.localhost.key
COPY etc/ssl/this.localhost.crt /etc/ssl/certs/this.localhost.crt

# Apache config
COPY etc/apache/apache2.conf /etc/apache2/
COPY etc/apache/ports.conf /etc/apache2/
COPY etc/apache/000-default.conf /etc/apache2/sites-available/
COPY etc/apache/default-ssl.conf /etc/apache2/sites-available/

# Add SSL support
RUN apt-get update && \
	apt-get install -y  --no-install-recommends ssl-cert && \
	a2enmod rewrite && \
	a2enmod headers && \
	a2enmod ssl && \
	a2ensite default-ssl && \
	apachectl configtest && \
	service apache2 restart

WORKDIR /var/www/html
