FROM node:8.16 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:latest
COPY build/ /usr/share/nginx/html
