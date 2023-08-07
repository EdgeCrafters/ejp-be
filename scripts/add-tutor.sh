#!/usr/bin/env bash

user_name=$1

cd ./gitolite-admin/conf/groups
echo -e "$user_name " >> tutors.conf
git add .
git commit -m "$user_name tutor added"
git push
cd ../../..