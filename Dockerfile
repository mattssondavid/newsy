FROM wordpress:4.9.5-php7.2-apache

# https://this.localhost SSL
# Point your network hosts to: 127.0.0.1  this.localhost
# Certificates created following https://letsencrypt.org/docs/certificates-for-localhost/
RUN echo "[dn]\nCN=this.localhost\n[req]\ndistinguished_name = dn\n[SAN]\nsubjectAltName=DNS:this.localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth" > /root/cert.config
RUN mkdir -p /etc/ssl/certs/private/ && \
	openssl req -x509 \
	-newkey rsa:2048 \
	-nodes \
	-sha256 \
	-days 365 \
	-keyout /etc/ssl/certs/private/this.localhost.key \
	-out /etc/ssl/certs/this.localhost.crt \
	-subj '/CN=this.localhost' \
	-extensions SAN \
	-reqexts SAN \
	-config /root/cert.config

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
