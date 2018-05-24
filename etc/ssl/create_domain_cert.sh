#!/usr/bin/env bash

mkdir -p /etc/ssl/certs/private
cd /root

if [ -z "$1" ]
then
    echo "Please supply a subdomain to create a certificate for";
    echo "e.g. www.mysite.com"
    exit;
fi

if [ ! -f rootCA.pem ]; then
    echo 'Please run "create_root_cert_and_key.sh" first, and try again!'
    exit;
fi
if [ ! -f v3.ext ]; then
    echo 'Please download the "v3.ext" file and try again!'
    exit;
fi

DOMAIN=$1
COMMON_NAME=$1
SUBJECT="/C=SE/ST=None/L=NB/O=None/CN=$COMMON_NAME"
NUM_OF_DAYS=999
openssl req -new -newkey rsa:2048 -sha256 -nodes -keyout device.key -subj "$SUBJECT" -out device.csr
cat v3.ext | sed s/%%DOMAIN%%/"$COMMON_NAME"/g > /tmp/__v3.ext
openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days $NUM_OF_DAYS -sha256 -extfile /tmp/__v3.ext

cp device.crt /etc/ssl/certs/this.localhost.crt
cp device.key /etc/ssl/certs/private/this.localhost.key
