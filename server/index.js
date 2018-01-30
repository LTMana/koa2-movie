const koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const app = new koa()

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




