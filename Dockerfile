FROM node:20.11.1

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "start"]