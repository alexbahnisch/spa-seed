FROM amazon/aws-lambda-nodejs:14 as node

RUN npm install -g npm@8.1.1


FROM node as base

COPY package*.json ./

RUN npm ci --omit dev --omit optional


FROM node as development

WORKDIR /src

COPY package*.json ./

RUN npm ci


FROM node as local

WORKDIR /src

COPY package*.json ./

RUN npm ci --optional --production

RUN mkdir ./server
RUN touch ./server/server.js

ENTRYPOINT []


FROM development as build

COPY app ./app
COPY tsconfig.json webpack.config.ts ./

RUN npm run build


FROM base as lambda

COPY --from=build /src/.build ${LAMBDA_TASK_ROOT}/

RUN npm rm -rf ${LAMBDA_TASK_ROOT}/server/server.js

CMD [ "server/lambda.handler" ]


FROM base as production

COPY --from=build /src/.build ${LAMBDA_TASK_ROOT}/.build/

RUN npm rm -rf ${LAMBDA_TASK_ROOT}/.build/server/lambda.js

CMD [ "npm", "run", "server" ]

ENTRYPOINT []
