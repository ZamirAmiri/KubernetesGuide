FROM node:16.14 as build-stage
RUN mkdir /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN yarn build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/build .
