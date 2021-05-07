FROM node:16

WORKDIR /client

COPY package.json /client
COPY yarn.lock /client

RUN yarn

COPY . .
COPY .env.development.local .env

ENV NODE_ENV development

EXPOSE 3000
CMD [ "yarn", "start" ]
USER node
