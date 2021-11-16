FROM node:16-alpine3.13 as builder
RUN apk add --no-cache chromium=93.0.4577.82-r2
RUN apk add --no-cache python3=3.9.8-r1

ENV CHROME_BIN='/usr/bin/chromium-browser'

WORKDIR /usr/src/app

COPY package.json ./
COPY public ./public
COPY src  ./src
COPY conf  ./conf

RUN npm install; npm run build 

#EXPOSE 3000

#NGINX server

# base image
FROM nginx:1.19.4-alpine

# update nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# copy static files
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
