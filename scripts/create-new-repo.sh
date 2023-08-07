#!/usr/bin/env bash

repo_name=$1

cd ./gitolite-admin/conf/
echo -e "\nrepo $repo_name\n  RW+  =  root\n  RW+  =  @tutors\nR  =    @$repo_name-group" >> ./gitolite.conf
echo -n "@$repo_name-group = " >> ./groups/$repo_name.conf
git add ./gitolite.conf
git commit -m "adding repo '$repo_name'"
git push
cd ../../..



