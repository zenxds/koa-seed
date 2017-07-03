const crypto = require('crypto')
const request = require('request-promise-native')
const weixinConfig = require('config').get('weixin')
const redisClient = require('../service/redis').factory()

const APP_ID = weixinConfig.appid
const APP_SECRET = weixinConfig.appsecret
const API_TOKEN = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`
const API_TICKET = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token='

/**
 * 随机字符串
 */
const createNonceStr = () => {
  return Math.random().toString(36).substr(2, 15)
}

const createTimestamp = () => {
  return parseInt(Date.now() / 1000) + ''
}

const param = (args) => {
  const keys = Object.keys(args)
  
  // 要按ASCII排序
  return keys.sort().map((key) => {
    return `${key.toLowerCase()}=${args[key]}`
  }).join('&')
}

const sha1 = (str) => {
  const sha1 = crypto.createHash('sha1')
  sha1.update(str)
  return sha1.digest('hex')
}

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
const sign = (jsapi_ticket, url) => {
  const params = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  }

  const ret = {
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: sha1(param(params))
  }
  return ret
}

const getAccessToken = async() => {
  let token = await redisClient.getAsync('weixin_access_token')
  if (token) {
    return token
  }

  const data = await request.get({
    uri: API_TOKEN,
    json: true
  })

  if (data.errcode) {
    console.log(data.errmsg)
    return ''
  }

  // 考虑到传输等问题，过期时间减10s
  await redisClient.setAsync('weixin_access_token', data.access_token)
  await redisClient.expireAsync('weixin_access_token', data.expires_in - 10)
  return data.access_token
}
const getJSTicket = async() => {
  let ticket = await redisClient.getAsync('weixin_js_ticket')
  if (ticket) {
    return ticket
  }

  const token = await getAccessToken()
  const data = await request.get({
    uri: API_TICKET + token,
    json: true
  })

  if (data.errcode) {
    console.log(data.errmsg)
    return ''
  }

  await redisClient.setAsync('weixin_js_ticket', data.ticket)
  await redisClient.expireAsync('weixin_js_ticket', data.expires_in - 10)
  return data.ticket
}

module.exports = {
  APP_ID: APP_ID,
  sign: sign,
  getJSTicket: getJSTicket
}
