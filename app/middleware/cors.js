module.exports = function(options={}) {

    options = Object.assign({}, {
      origin: '',
      allowMethods: 'GET,POST,OPTIONS',
      // 实际请求中允许携带的首部字段
      allowHeaders: 'Accept,Content-Type,X-Requested-With',
      // 访问自定义头
      exposeHeaders: '',
      credentials: true,
      maxAge: 86400,
    }, options)

    if (Array.isArray(options.exposeHeaders)) {
      options.exposeHeaders = options.exposeHeaders.join(',')
    }

    if (Array.isArray(options.allowMethods)) {
      options.allowMethods = options.allowMethods.join(',')
    }

    if (Array.isArray(options.allowHeaders)) {
      options.allowHeaders = options.allowHeaders.join(',')
    }

    if (options.maxAge) {
      options.maxAge = String(options.maxAge)
    }

    options.credentials = !!options.credentials

    return async function(ctx, next) {
      const requestOrigin = ctx.get('Origin')

      ctx.vary('Origin')

      if (!requestOrigin) {
        return await next()
      }

      let origin

      if (typeof options.origin === 'function') {
        origin = options.origin(ctx, requestOrigin)
        if (!origin) {
          return await next()
        }
      } else {
        origin = options.origin || requestOrigin
      }

      const headersSet = {}

      function set(key, value) {
        ctx.set(key, value)
        headersSet[key] = value
      }

      if (ctx.method !== 'OPTIONS') {

        ctx.set('Access-Control-Allow-Origin', origin)

        if (options.credentials === true) {
          ctx.set('Access-Control-Allow-Credentials', 'true')
        }

        if (options.exposeHeaders) {
          ctx.set('Access-Control-Expose-Headers', options.exposeHeaders)
        }

        try {
          await next()
        } catch(err) {
          err.headers = Object.assign({}, err.headers, headersSet)
          throw err
        }
      } else {

        if (!ctx.get('Access-Control-Request-Method')) {
          return await next()
        }

        ctx.set('Access-Control-Allow-Origin', origin)

        if (options.credentials === true) {
          ctx.set('Access-Control-Allow-Credentials', 'true')
        }

        if (options.maxAge) {
          ctx.set('Access-Control-Max-Age', options.maxAge)
        }

        if (options.allowMethods) {
          ctx.set('Access-Control-Allow-Methods', options.allowMethods)
        }

        const allowHeaders = options.allowHeaders || ctx.get('Access-Control-Request-Headers')
        if (allowHeaders) {
          ctx.set('Access-Control-Allow-Headers', allowHeaders)
        }

        ctx.status = 204
      }
    }
  }
