# Step 1:
FROM node:16-alpine3.13 as build-step
#RUN apk add --no-cache chromium=93.0.4577.82-r2
RUN apk add --no-cache chromium=86.0.4240.111-r0
RUN apk add --no-cache python3=3.9.8-r1

ENV CHROME_BIN='/usr/bin/chromium-browser'

# Copy the app code in the “app” folder
RUN mkdir -p /app
WORKDIR /app
#WORKDIR /usr/src/app

# Install app dependencies from package.json file 
COPY package.json /app
#COPY package.json ./
COPY public ./public
COPY src  ./src
COPY conf  ./conf

#RUN npm install; npm run build 
RUN npm install 

COPY . /app

# Create production build using Node image
RUN  npm run build --prod
#EXPOSE 3000

# Step 2 - NGINX server

# base image - use the Ngix server image to create the Nginx server
FROM nginx:1.19.4-alpine

# update nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Copy/deploy the application (static) files to the Nginx server at /usr/share/Nginx/HTML location
COPY --from=build-step /app/dist/DemoApp /usr/share/nginx/html
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
