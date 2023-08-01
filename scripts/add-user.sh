#!/usr/bin/env bash

user_name=$1
secret_key=$2

ssh -t gitolite@localhost 'cd ./gitolite-admin/keydir/ && cat $secret_key >> $user_name.pub&& exit; bash'

