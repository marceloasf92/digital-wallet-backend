FROM node:16-alpine

RUN apk update

WORKDIR /app

COPY package.json /app/

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]