/**
 * @file Api config / Commonjs module
 * @module api.config
 */

const { isProdMode } = require('./environment')

module.exports = {
  hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://weixin.chinauff.com/spring',
  // hostUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://wx.caixie.top/spring',
  cdnUrl: isProdMode ? 'https://weixin.chinauff.com/spring' : 'http://spring.chinauff.com/spring',
  proxyUrl: isProdMode ? 'https://weixin.chinauff.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
  baseUrl: isProdMode ? 'http://spring.chinauff.com/api' : 'http://spring.chinauff.com/api',
  caixieUrl: isProdMode ? 'http://backoffice.caixie.top/api' : 'http://backoffice.caixie.top/api',
  thirdUrl: isProdMode ? 'https://weixin.chinauff.com/lnj-weixin/console' : 'http://demo.micvs.com/lnj-weixin/console',
  socketHost: isProdMode ? 'https://caixie.top' : 'http://wx.caixie.top'
}
