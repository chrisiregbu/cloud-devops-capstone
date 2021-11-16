FROM node:16-alpine3.13 as builder
RUN apk add chromium
#RUN apk add --no-cache  curl=7.61.1-r1
RUN apk add --no-cache \
    git=2.8.6-r0 \
    bash=4.3.42-r6 \
    python3=3.5.1-r0

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

RUN rm /var/cache/apk/*

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
