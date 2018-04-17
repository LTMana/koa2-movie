const koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const app = new koa()
;(async () => {
  await connect()
  initSchemas()
  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({})
  console.log(movies)
})()
app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    me: 'LTMana',
    you: 'jiazheng'
  })
})

app.listen(4455)




