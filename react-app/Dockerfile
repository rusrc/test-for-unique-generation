
# Образ на основе более облегченной сборки Node:<v>-alpine (https://hub.docker.com/_/node)
FROM node:18-alpine as BUILD_IMAGE  
WORKDIR /app/react-app
COPY package.json .
RUN npm install

# скопируем все файлы исходников и запустим сборку бандла
COPY . .
RUN npm run build

# Скопируем сборку бандла
FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist
EXPOSE 8080

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript
EXPOSE 8080
CMD ["npm", "run", "preview"]

# docker build -t react-client-image:latest .
# docker run -p 8080:8080 react-client-image:latest
