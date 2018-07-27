module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "koa-app",
      script: "index.js",
      instances : 'max',
      exec_mode : 'cluster',
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}
