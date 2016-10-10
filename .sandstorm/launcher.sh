#!/bin/bash
set -euo pipefail

if [ ! -e /var/git ]; then
  cd /var
  git clone --bare /opt/app/pandoc_resume git
fi

if [ ! -e /var/www ]; then
  mkdir -p /var/www
  /opt/app/make-resume
fi

cd /opt/app
cp index.html /var/www
cp make-resume /var/git/hooks/post-receive
NODE_ENV=production HOME=/tmp npm start
