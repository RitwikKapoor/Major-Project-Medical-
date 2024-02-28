FROM node:18-alpine3.16
WORKDIR /app/express-server
COPY ./package.json ./
RUN npm install
COPY ./express-server/ .
RUN pwd && ls
CMD ["npm", "start"]