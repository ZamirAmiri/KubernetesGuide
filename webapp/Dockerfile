FROM node:16.14 as build-stage
WORKDIR /app
COPY ./KubernetesInstallationGuide/webapp/package*.json /app/
RUN yarn
COPY ./ /app/
RUN yarn build

FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
