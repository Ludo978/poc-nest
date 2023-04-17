FROM node:18-alpine

ENV SECRET_KEY secret

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
