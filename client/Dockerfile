FROM node:18-alpine3.16

WORKDIR /app/client

COPY ./package*.json ./

RUN npm install 

COPY . .    

CMD ["npm", "run", "dev"]