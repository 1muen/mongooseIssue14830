FROM node:20.17.0-alpine3.20@sha256:1a526b97cace6b4006256570efa1a29cd1fe4b96a5301f8d48e87c5139438a45 as base
WORKDIR /node
ENV PATH /node/node_modules/.bin:$PATH
ENV NODE_ENV=development
WORKDIR /node/app
CMD ["node_modules/nodemon/bin/nodemon.js", "src/server.js"]
