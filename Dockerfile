FROM node:latest

ENV APP_DIR /var/www

ENV TZ Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && mkdir -p $APP_DIR

WORKDIR $APP_DIR

COPY . $APP_DIR

RUN npm install -g yarn --registry=https://registry.dingxiang-inc.net \
    && yarn install --registry=https://registry.dingxiang-inc.net

EXPOSE 7002

# Entrypoint
CMD ["npm", "run", "start:docker"]
