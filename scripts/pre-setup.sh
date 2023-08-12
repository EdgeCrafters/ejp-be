#!/usr/bin/env bash

set -ex

chmod +x ./scripts/create-new-repo.sh
chmod +x ./scripts/add-user.sh
chmod +x ./scripts/add-tutor.sh
chmod +x ./scripts/create-user.sh
chmod +x ./scripts/setup.sh

yes '' | ssh-keygen -N ''
# ssh-keygen
echo -n "SSH_KEY=" >> .env
cat ~/.ssh/id_rsa.pub >> .env

