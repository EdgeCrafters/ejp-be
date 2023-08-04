#!/usr/bin/env bash

user_name=$1
repo_name=$2
secret_key1=$3
secret_key2=$4
secret_key3=$5

cd ./gitolite-admin/keydir/
echo "$secret_key1 $secret_key2 $secret_key3" >> $user_name.pub 
cd ../conf/groups
echo "$user_name " > $repo_name.conf
git add .
git commit -m "$user_name user added"
git push
cd ../../..

