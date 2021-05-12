FROM node:16-alpine

WORKDIR /client

COPY package.json /client
COPY yarn.lock /client

RUN yarn

COPY . .

ENV NODE_ENV development

EXPOSE 3000
CMD [ "yarn", "start" ]
