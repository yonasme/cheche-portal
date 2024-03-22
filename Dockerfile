FROM node:21-slim as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf