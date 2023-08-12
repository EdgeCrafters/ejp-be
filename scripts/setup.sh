#!/usr/bin/env bash

set -ex

# Check requirements: npm
if [ ! $(command -v npm) ]
then
  echo "Error: npm is not installed. Please install npm first."
  exit 1
fi

BASEDIR=$(dirname $(dirname $(realpath $0)))

cd $BASEDIR

# Generate env file
echo "DATABASE_URL=\"postgresql://postgres:1234@skku-ejs-dev-db:5432/skku?schema=public\"" >> .env
echo "PORT=4000" >> .env
echo "SESSION_SECRET=ASD3FCV3XDSI5MVQWR643LKW23EQFLM" >> .env

# Install pnpm and Node.js packages
npm install -g pnpm@latest
pnpm install

# Enable git auto completion
if ! grep -q "bash-completion/completions/git" ~/.bashrc
then
  echo "source /usr/share/bash-completion/completions/git" >> ~/.bashrc
fi

# Apply database migration
for i in {1..5}
do
  pnpm exec prisma migrate dev && break # break if migration succeed
  echo -e '\n⚠️ Failed to migrate. Waiting for db to be ready...\n'
  sleep 5
done

echo installing ssh-server settings..
sudo apt-get update
sudo apt-get install -y openssh-server ssh-client
service ssh restart
yes '' | ssh-keygen -N ''

echo setting git user..
usernames=("git" "testuser")
for username in "${usernames[@]}"
do
sudo useradd -m -s /bin/bash "$username"

echo "$username:0000" | sudo chpasswd

sudo chown -R "$username:$username" "/home/$username"

sudo chmod 700 "/home/$username"
done

rm -rf gitolite-admin
cp /root/.ssh/id_rsa.pub /tmp/root.pub
ssh git@localhost -t 'git clone https://github.com/sitaramc/gitolite && cd $HOME && mkdir -p bin && gitolite/install -to $HOME/bin && cd $HOME && $HOME/bin/gitolite setup -pk /tmp/root.pub && exit; bash'

echo "chmod to scripts.."
chmod +x ./scripts/create-new-repo.sh
chmod +x ./scripts/add-user.sh
chmod +x ./scripts/add-tutor.sh
chmod +x ./scripts/create-user.sh


echo "cloning gitotlie-admin to backend.."
git clone git@localhost:gitolite-admin
cd gitolite-admin
mkdir ./conf/groups
echo 'include "groups/*.conf"' >> ./conf/gitolite.conf
echo -n '@tutors = ' >> ./conf/groups/tutors.conf
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
git add . && git commit -m "group conf-file added" && git push
cd ..

echo "setup scripts for ejs-t & ejs-s"
cd $BASEDIR
sudo apt-get install git clang cmake g++ pkg-config libkrb5-dev libssl-dev python3
