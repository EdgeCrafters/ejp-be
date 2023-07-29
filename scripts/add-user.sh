#!/bin/bash

repo_name=$1
secret_key=$2

su $repo_name
echo $secret_key >> ~./ssh/authorized_keys
exit
