/**
 * Created: leezii
 * Date: 2018/1/22
 * Time: 17:05
 */
const fs = require('fs')
const path = require('path')

function getEntries (type) {
  let src = path.resolve(__dirname, '../src/page')
  let names = fs.readdirSync(src)
  const entries = {}
  names.forEach(v => {
    entries[v] = `${src}/${v}/${v}.${type}`
  })
  return entries
}
function gitIp () {
  let interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' &&
        !alias.internal) {
        return alias.address
      }
    }
  }
}
module.exports = {
  getEntries,
  gitIp
}