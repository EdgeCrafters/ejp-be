yes '' | ssh-keygen -N ''
cp -r /root/.ssh ./

export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
scp /root/.ssh/id_rsa.pub git@gitolite:/tmp/root.pub
ssh git@gitolite -t 'git clone https://github.com/sitaramc/gitolite && cd $HOME && mkdir -p bin && gitolite/install -to $HOME/bin && cd $HOME && $HOME/bin/gitolite setup -pk /tmp/root.pub && exit; bash'

rm -rf gitolite-admin
echo "cloning gitotlie-admin to backend.."
git clone git@gitolite:gitolite-admin >> log.txt
cd gitolite-admin
mkdir ./conf/groups
echo 'include "groups/*.conf"' >> ./conf/gitolite.conf
echo -n '@tutors = ' >> ./conf/groups/tutors.conf
git config  user.email "you@example.com"
git config  user.name "Your Name"
git add . && git commit -m "group conf-file added" && git push
cd ..