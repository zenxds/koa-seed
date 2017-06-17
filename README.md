# koa-boilerplate

```
npm i
mkdir log
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

## tips

bodyparser有提交长度限制