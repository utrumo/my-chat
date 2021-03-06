FROM node:14.4.0-buster-slim
WORKDIR /home/node/app
RUN chown node:node .
COPY --chown=node:node ./server/package*.json ./
USER node
ENV NODE_ENV=production
RUN npm install
COPY --chown=node:node ./server ./

ENV CORS_ORIGIN=http://my-chat.localhost
ENTRYPOINT ["npm", "start"]
