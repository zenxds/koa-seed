FROM node:8

ENV APP_DIR /var/www/app
ENV DATA_DIR /var/data/app

RUN mkdir -p $APP_DIR

COPY package.json $APP_DIR

WORKDIR $APP_DIR

RUN npm install --registry=https://registry.npm.taobao.org

COPY . $APP_DIR

RUN cp config/dev.js config/prod.js

EXPOSE 7002

VOLUME $DATA_DIR

# Entrypoint
CMD ["npm", "run", "docker:start"]