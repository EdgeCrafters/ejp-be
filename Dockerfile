FROM docker.io/debian:12.1-slim

ARG GITOLITE_PACKAGE_VERSION=3.6.12-1

ARG GIT_PACKAGE_VERSION=1:2.39.2-1.1
ARG OPENSSH_SERVER_PACKAGE_VERSION=1:9.2p1-2
ARG TINI_PACKAGE_VERSION=0.19.0-1
ARG username=git
ARG HOME=/home/git
ARG GITOLITE_HOME_PATH=/var/lib/gitolite
ENV SSHD_HOST_KEYS_DIR=/etc/ssh/host_keys

RUN apt-get update \
    &&  apt-get install --no-install-recommends --yes \
        git=$GIT_PACKAGE_VERSION \
        locales \
        openssh-server=$OPENSSH_SERVER_PACKAGE_VERSION \
        tini=$TINI_PACKAGE_VERSION \
    &&  useradd -m -s /bin/bash "$username" \
    &&  echo "$username:0000" |  chpasswd \
    &&  chown -R "$username:$username" "/home/$username" \
    &&  chmod 700 "/home/$username" \
    && rm -rf /var/lib/apt/lists/* \
    && rm /etc/ssh/ssh_host_*_key* \
    && mkdir "$SSHD_HOST_KEYS_DIR" \
    && chown -c "$USER" "$SSHD_HOST_KEYS_DIR" \
    && ssh-keygen -A \
    && mkdir -p /var/run/sshd \
    && echo "mkdir -p /var/run/sshd" >> /etc/rc.local \
    && git config --global http.sslverify false \
    && locale-gen en_US.UTF-8 
WORKDIR $HOME
USER $USER
CMD ["/usr/sbin/sshd", "-D", "-e"]
