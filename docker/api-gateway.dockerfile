FROM node:alpine

WORKDIR "/app"

RUN yarn global add typescript

RUN yarn global add @nestjs/cli

COPY ./package.json ./package.json

COPY ./decorate-angular-cli.js ./decorate-angular-cli.js

COPY ./angular.json ./angular.json

COPY ./apps/student-registration-e2e/project.json ./apps/student-registration-e2e/project.json

COPY ./tsconfig.base.json ./tsconfig.base.json

COPY ./apps/api/project.json ./apps/api/project.json

COPY ./nx.json ./nx.json

COPY ./apps/api/api-gateway ./apps/api/api-gateway

RUN cat package.json

RUN yarn add @nestjs/core

RUN cd apps/api/api-gateway

RUN yarn add @nestjs/microservices

CMD [ "yarn", "install"]
