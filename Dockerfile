FROM node:12-alpine

WORKDIR /usr/src/app
RUN apk add --no-cache poppler-utils
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn compile
EXPOSE 3030

CMD ["yarn", "start"]