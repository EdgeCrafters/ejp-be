#!/usr/bin/env bash

user_name=$1
secret_key1=$2
secret_key2=$3
secret_key3=$4

cd ./gitolite-admin/conf/groups
echo -n "$user_name " >> tutors.conf
cd ../../keydir
echo "$secret_key1 $secret_key2 $secret_key3" >> $user_name.pub 
git add ./$user_name.pub ../conf/groups/tutors.conf
git commit -m "$user_name tutor added"
git push
cd ../../..