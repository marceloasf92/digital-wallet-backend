FROM node:16-alpine3.16

RUN apk update
RUN npm install pm2 -g

WORKDIR /app

COPY package.json /app/

RUN yarn

COPY . .

CMD ["yarn", "pm2" ]

