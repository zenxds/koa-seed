module.exports = {
  appenders: {
    console: {
      type: 'console'
    },
    error: {
      type: 'fileSync',
      filename: 'log/error.log',
      category: 'error'
    },
    app: {
      type: 'fileSync',
      filename: 'log/app.log',
      category: 'app'
    }
  },

  categories: {
    default: { appenders: ['console'], level: 'debug' },
    error: { appenders: ['error'], level: 'error' },
    app: { appenders: ['app'], level: 'info' }
  }
}
