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
echo "DATABASE_URL=\"postgresql://postgres:1234@localhost:5432/skku?schema=public\"" > .env
echo "PORT=4000" >> .env
echo "SESSION_SECRET=ASD3FCV3XDSI5MVQWR643LKW23EQFLM" >> .env
echo "MINIO_PORT=9000" >> .env
echo "MINIO_END_POINT=localhost" >> .env
echo "MINIO_ACCESS_KEY=minioadmin" >> .env
echo "MINIO_SECRET_KEY=minioadmin" >> .env
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
