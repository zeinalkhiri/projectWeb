FROM node:16

WORKDIR /app

COPY ./src/mysqlServer .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
