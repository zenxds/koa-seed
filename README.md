# koa-boilerplate

```
npm i
npm start
```

## 文件说明

```
log/access.log  // 访问log
log/app.log     // 应用log
log/error.log   // 错误log

config/log4js  // 日志文件配置
config/nginx // nginx部署配置
其他为环境配置文件

app/controller
app/middleware
app/model
app/public
app/service
app/view
```

## 部署说明

目前有两种部署到服务器的方式，第一种是使用pm2 deploy，第二种是使用docker部署

第一种配置好ecosystem.config.js的deploy部分，然后运行`npm run deploy:prd`即可部署到服务器

第二种首先安装docker和docker-compose，写好docker配置文件（主要redis和mysql的host要使用主机名），运行`npm run deploy:docker`

## tips

bodyparser有提交长度限制
