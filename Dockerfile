# # stage 1
# FROM node:16.14.0-alpine as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# # stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/la_capitale_front /usr/share/nginx/html

# Bikor dorkerfile

FROM node:16.14.2-alpine as builder

# #ARG API_BASE_URL

# #ENV API_BASE_URL "$API_BASE_URL"

RUN mkdir -p /app

# # now test and build the app
WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build -- --configuration="production"

# Stage 2
FROM nginx:1.21.6-alpine

EXPOSE 80

RUN rm -rf /usr/share/nginx/html/*

COPY src/app/conf/default.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist/la_capitale_front /usr/share/nginx/html

# COPY --from=builder /app-osr/scripts/replace_api_url.sh /

#RUN ["chmod", "+x", "replace_api_url.sh"]

#CMD ["sh", "replace_api_url.sh"]

# Bikor dockerfile fin


