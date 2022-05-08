FROM node:14-alpine
RUN mkdir -p /home/node/app

USER node
WORKDIR /home/node/app
COPY package*.json ./

USER root
RUN chown -R node:node /home/node/app
RUN npm install
COPY --chown=node:node . .

USER node
EXPOSE 3003

CMD [ "node", "app.js"]
