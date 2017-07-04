# koa-boilerplate

```
npm i
npm start
```

## 文件说明

```
bin/appctl.sh // prod环境下管理应用启动，使用pm2管理之后就不再需要

log/access.log  // 访问log
log/app.log     // 应用log
log/error.log   // 错误log

config/log4js.js  // 日志文件配置
config/nginx.conf // nginx部署配置
```

## 部署说明

目前有两种部署到服务器的方式，第一种是使用pm2 deploy，第二种是使用docker部署

第一种配置好ecosystem.config.js的deploy部分，然后运行`npm run deploy`即可部署到服务器

第二种首先安装docker，运行`npm run docker:build`生成镜像，然后运行`npm run docker:run`启动容器

## tips

bodyparser有提交长度限制