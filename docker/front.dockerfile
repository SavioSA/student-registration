FROM node:alpine

WORKDIR "/app"

RUN yarn global add typescript

COPY ./package.json ./package.json

COPY ./decorate-angular-cli.js ./decorate-angular-cli.js

COPY ./angular.json ./angular.json

COPY ./apps/student-registration-e2e/project.json ./apps/student-registration-e2e/project.json

COPY ./tsconfig.base.json ./tsconfig.base.json

COPY ./apps/api/project.json ./apps/api/project.json

COPY ./nx.json ./nx.json

RUN yarn install


CMD [ "yarn", "run", "start", "student-registration", "--host", "0.0.0.0" ]
