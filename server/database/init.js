const mongoose = require('mongoose')
const db = 'mongodb://118.89.201.107:27017/douban-test'
const glob = require('glob') // 可以使用*号匹配规则
const {resolve} = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}


exports.connect = () => {

  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db)
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes ++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了')
      }
      
    })
    mongoose.connection.on('error', err => {
      maxConnectTimes ++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库挂了')
      }
    })
    mongoose.connection.once('open', () => {
      resolve()
      console.log('MongoDB Connected successfully!')
    })
  })
 
}