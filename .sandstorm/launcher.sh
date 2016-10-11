#!/bin/bash
set -euo pipefail

if [ ! -e /var/git ]; then
  git clone /opt/app/pandoc_resume /var/git
  cd /var/git
  git config receive.denyCurrentBranch ignore
fi

if [ ! -e /var/www ]; then
  mkdir -p /var/www
  /opt/app/make-resume
fi

cd /opt/app
cp index.html /var/www
cp make-resume /var/git/.git/hooks/post-receive
NODE_ENV=production HOME=/tmp npm start
