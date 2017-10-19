/**
 * 刷新腾讯云 CDN
 */

'use strict'

const qcloudSDK = require('qcloud-cdn-node-sdk')
const qcloudConfig = require('config').get('qcloud')

qcloudSDK.config(qcloudConfig)

async function refreshURL(urls) {
  return new Promise((resolve, reject) => {
    qcloudSDK.request('RefreshCdnUrl', normalize(urls, 'urls'), (res) => {
      if (typeof res === 'string') {
        res = JSON.parse(res)
      }

      if (res.code === 0) {
        resolve(res.data)
      } else {
        reject(res.message)
      }
    })
  })
}

async function refreshDir(dirs) {
  return new Promise((resolve, reject) => {
    qcloudSDK.request('RefreshCdnDir', normalize(dirs, 'dirs'), (res) => {
      if (typeof res === 'string') {
        res = JSON.parse(res)
      }

      if (res.code === 0) {
        resolve(res.data)
      } else {
        reject(res.message)
      }
    })
  })
}

function normalize(urls=[], type) {
  const ret = {}

  for (let i = 0; i < urls.length; i++) {
    ret[`${type}.${i}`] = urls[i]
  }

  return ret
}

module.exports = {
  refreshURL,
  refreshDir
}
