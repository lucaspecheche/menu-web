FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /menu-web

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "serve"]
