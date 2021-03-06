FROM node:8
MAINTAINER BIT

COPY . /BIT_HFCS_SERVER
RUN set -x \
    && cd /BIT_HFCS_SERVER \
    && rm -rf /BIT_HFCS_SERVER/crypto-config \
    && npm install --unsafe-perm

EXPOSE 3000
WORKDIR /BIT_HFCS_SERVER
ENTRYPOINT ["npm","start"]
