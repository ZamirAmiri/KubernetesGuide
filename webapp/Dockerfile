FROM node:8.16 as build-deps
RUN mkdir /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN yarn build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY /usr/src/app/build .
