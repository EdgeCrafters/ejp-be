#!/usr/bin/env bash

user_name=$1
secret_key=$2


cd ./gitolite-admin/keydir/
echo "$secret_key" >> $user_name.pub 
git add .
git commit -m "$user_name user added"
git push
cd ../../..

