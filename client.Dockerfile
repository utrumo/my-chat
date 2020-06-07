FROM node:14.4.0-buster-slim as builder
WORKDIR /home/node/app
RUN chown node:node .
COPY --chown=node:node ./client/package*.json ./
USER node
RUN npm install
COPY --chown=node:node ./client ./

ARG REST_API_SERVER
ARG WEBSOCKET_API_SERVER
ENV REST_API_SERVER=${REST_API_SERVER:-http://api.my-chat.localhost}
ENV WEBSOCKET_API_SERVER=${WEBSOCKET_API_SERVER:-ws://api.my-chat.localhost}
RUN npm run build

FROM nginx:1.19.0-alpine
WORKDIR /usr/share/nginx/html
COPY --chown=root:root --from=builder /home/node/app/dist/* ./
