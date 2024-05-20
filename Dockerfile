FROM alpine:3.19

ENV NODE_VERSION 20.13.1

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start"]