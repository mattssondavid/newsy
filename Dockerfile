FROM wordpress:latest

# https://this.dev SSL
# Point your network hosts to: 127.0.0.1  this.dev
# Certificates created following https://letsencrypt.org/docs/certificates-for-localhost/
COPY etc/ssh/this.dev.key /etc/ssl/certs/private/
COPY etc/ssh/this.dev.crt /etc/ssl/certs/

# Apache config
COPY etc/apache/apache2.conf /etc/apache2/
COPY etc/apache/ports.conf /etc/apache2/
COPY etc/apache/000-default.conf /etc/apache2/sites-available/
COPY etc/apache/default-ssl.conf /etc/apache2/sites-available/

# Add SSL support
RUN apt-get update && \
	apt-get install -y  --no-install-recommends ssl-cert

RUN a2enmod rewrite && \
	a2enmod headers && \
	a2enmod ssl && \
	a2ensite default-ssl

RUN apachectl configtest

RUN service apache2 restart

WORKDIR /var/www/html
