#!/usr/bin/env bash

user_name=$1
repo_name=$2

cd ./gitolite-admin/conf/groups
echo -n "$user_name " >> $repo_name.conf
git add .
git commit -m "$user_name user added"
git push
cd ../../..

