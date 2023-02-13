FROM node:18.14.0-alpine3.17 AS build

workdir /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18.14.0-alpine3.17

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install --only=prod

EXPOSE 3000


CMD [ "pnpm", "start:prod" ]