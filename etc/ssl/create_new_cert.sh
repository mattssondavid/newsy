#!/bin/bash
# Certificates created following https://letsencrypt.org/docs/certificates-for-localhost/
# Run this script in a Docker container (or Unix system) to create a new
# certificate for the development site
#
# You can verify that the certificate is created successfully with the command
#
# openssl x509 -in /etc/ssl/certs/this.localhost.crt -text -noout
#
# in the Docker container.
#
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
	-config <( \
   printf "[dn]\nCN=this.localhost\n[req]\ndistinguished_name = dn\n[SAN]\nsubjectAltName=DNS:this.localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
