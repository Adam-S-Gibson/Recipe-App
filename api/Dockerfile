FROM node:14

WORKDIR /usr/src/app/api

COPY . .

RUN npm i --legacy-peer-deps

EXPOSE 3080

RUN ["npx", "prisma", "generate"]

CMD ["npm", "run", "dev"]
