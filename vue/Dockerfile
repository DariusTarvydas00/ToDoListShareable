# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY expose-env.sh /docker-entrypoint.d/40-expose-env.sh
RUN chmod 777 /docker-entrypoint.d/40-expose-env.sh
CMD ["nginx", "-g", "daemon off;"]