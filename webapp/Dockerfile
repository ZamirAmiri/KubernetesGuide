FROM node:16.14 as build-stage
WORKDIR /app
COPY webapp/package*.json /app/
RUN yarn
COPY ./ /app/
RUN npm run build

FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
