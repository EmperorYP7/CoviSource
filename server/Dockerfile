FROM mhart/alpine-node:16

# Create app directory
WORKDIR /server

COPY package.json /server
COPY yarn.lock /server

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV development

EXPOSE 4000
CMD [ "yarn", "dev" ]
