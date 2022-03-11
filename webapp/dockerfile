FROM node:16.14 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY ./ /app/
RUN chown root:root /app/
RUN yarn build

FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
