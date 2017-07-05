FROM node:8

ENV APP_DIR /var/www

RUN mkdir -p $APP_DIR

WORKDIR $APP_DIR

COPY package.json $APP_DIR

RUN npm install --registry=https://registry.npm.taobao.org

COPY . $APP_DIR

EXPOSE 7002

# Entrypoint
CMD ["npm", "run", "docker:start"]