# Stage 1
FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install --legacy-peer-deps
RUN npm run build 
# Stage 2
FROM nginx:latest
COPY --from=build /usr/local/app/dist/angular /usr/share/nginx/html

EXPOSE 1300