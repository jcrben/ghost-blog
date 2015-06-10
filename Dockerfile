FROM ubuntu:vivid
MAINTAINER Ben Creasy <contact@bencreasy.com>

ENV DEBIAN_FRONTEND noninteractive
# ENV NODE_ENV production

RUN apt-get update -y
RUN apt-get -qq update -y
RUN apt-get install -y nodejs npm sqlite3 -y
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN mkdir /app
VOLUME /home/persistence
ADD . /app
WORKDIR /app
# this works! -> CMD npm install --production; node index.js
CMD npm install --production; npm start --production
