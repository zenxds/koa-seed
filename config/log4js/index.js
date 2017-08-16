module.exports = {
  appenders: [
    {
      type: 'console'
    },
    {
      type: 'dateFile',
      filename: 'log/access.log',
      category: 'access'
    },
    {
      type: 'dateFile',
      filename: 'log/app.log',
      category: 'app'
    },
    {
      type: 'dateFile',
      filename: 'log/error.log',
      category: 'error'
    }
  ]
}
