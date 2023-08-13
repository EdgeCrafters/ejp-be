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

echo "chmod to scripts.."
chmod +x ./scripts/create-new-repo.sh
chmod +x ./scripts/add-user.sh
chmod +x ./scripts/add-tutor.sh
chmod +x ./scripts/create-user.sh
chmod +x ./scripts/gitolite-init.sh

git config --global --add safe.directory /workspace

echo "setup scripts for ejs-t & ejs-s"
cd $BASEDIR
sudo apt-get install git clang cmake g++ pkg-config libkrb5-dev libssl-dev python3
