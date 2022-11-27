FROM node:19-alpine3.15

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
