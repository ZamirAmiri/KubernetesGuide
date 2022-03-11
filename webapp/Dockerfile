FROM node:8.16 as build-deps
RUN mkdir /usr/src/app
COPY . ./
WORKDIR /usr/src/app
RUN yarn
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN yarn build

FROM nginx:latest
COPY build/ /usr/share/nginx/html
