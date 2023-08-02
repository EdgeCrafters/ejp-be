#!/usr/bin/env bash

user_name=$1
secret_key1=$2
secret_key2=$3
secret_key3=$4

cd ./gitolite-admin/keydir/
echo "$secret_key1 $secret_key2 $secret_key3" >> $user_name.pub 
git add .
git commit -m "$user_name user added"
git push
cd ../../..

