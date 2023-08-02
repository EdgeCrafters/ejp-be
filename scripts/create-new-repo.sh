#!/usr/bin/env bash

repo_name=$1

# sudo adduser $repo_name
# echo "0000" | chpasswd
# #sudo chown $repo_name:$repo_name -R /home/$repo_name/  소유권 넘기기

# echo "0000" | su -S $repo_name
# mkdir .ssh
# sudo chmod 700 .ssh
# touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys

# mkdir repo.git 
# git init --bare repo.git/
# exit

# ssh -t gitolite@localhost 'cd ./gitolite-admin/conf/ && (echo -e "repo $repo_name\n RW+ = gitolite\n  R = @all" >> ./gitolite.conf) && git add ./gitolite.conf && git commit -m "create new repo" && git push && exit; bash'
cd ./gitolite-admin/conf/
echo -e "\nrepo $repo_name\n  RW+  =  root \n  R  =    @all" >> ./gitolite.conf
git add ./gitolite.conf
git commit -m "adding repo '$repo_name'"
git push
cd ../../..



