FROM node:14

WORKDIR /usr/src/app/ui

COPY package*.json ./

RUN npm i --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]
