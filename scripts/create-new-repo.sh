#!/bin/bash

repo_name=$1

sudo adduser $repo_name
echo "0000" | chpasswd
#sudo chown $repo_name:$repo_name -R /home/$repo_name/  소유권 넘기기

echo "0000" | su -S $repo_name
mkdir .ssh
sudo chmod 700 .ssh
touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys

mkdir repo.git 
git init --bare repo.git/
exit



