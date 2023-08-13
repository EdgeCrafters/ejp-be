FROM docker.io/debian:12.1-slim

ARG GITOLITE_PACKAGE_VERSION=3.6.12-1

ARG GIT_PACKAGE_VERSION=1:2.39.2-1.1
ARG OPENSSH_SERVER_PACKAGE_VERSION=1:9.2p1-2
ARG TINI_PACKAGE_VERSION=0.19.0-1
ARG USER=git
ARG HOME=/home/git
ARG PASS=0000

RUN apt-get update \
    && apt-get install --no-install-recommends --yes \
        git=$GIT_PACKAGE_VERSION \
        gitolite3=$GITOLITE_PACKAGE_VERSION \
        openssh-server=$OPENSSH_SERVER_PACKAGE_VERSION \
        tini=$TINI_PACKAGE_VERSION 
    # && rm -rf /var/lib/apt/lists/* \
    # && rm /etc/ssh/ssh_host_*_key* \
    # && useradd -m -s /bin/bash $USER_NAME  \
    # && echo "$USER_NAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
    # && mkdir "$SSHD_HOST_KEYS_DIR" \
    # && chown -c "$USER" "$SSHD_HOST_KEYS_DIR"
    
# WORKDIR $USER_HOME
# USER $USER
CMD ["/usr/sbin/sshd", "-D", "-e"]
