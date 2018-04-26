FROM wordpress:latest

# Localhost SSL
# Certificates created following https://letsencrypt.org/docs/certificates-for-localhost/
COPY etc/ssh/localhost.key /etc/ssl/certs/private/
COPY etc/ssh/localhost.crt /etc/ssl/certs/

# Apache config
COPY etc/apache/000-default.conf /etc/apache2/sites-available/
COPY etc/apache/default-ssl.conf /etc/apache2/sites-available/

# Add SSL support
RUN apt-get update && \
	apt-get install -y  --no-install-recommends ssl-cert && \
	rm -r /var/lib/apt/lists/* && \
	a2enmod ssl && \
	a2ensite default-ssl

WORKDIR /var/www/html
