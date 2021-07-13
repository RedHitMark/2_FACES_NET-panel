FROM node:latest

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3455
CMD [ "npm", "run", "start"]