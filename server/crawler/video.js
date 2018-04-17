const puppeteer = require('puppeteer')
const base = `https://movie.douban.com/subject/`;
const doubanId = '27090813'
const videoBase = `https://movie.douban.com/trailer/`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
});

(async () => {
  console.log('Start visit the target page')
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Users/liubotong/chrom/Chromium.app/Contents/MacOS/Chromium',
      args: ['--no-sandbox'] // 配置非沙盒模式防止崩溃，安全性有影响
    });
    const page = await browser.newPage();
    await page.goto(base + doubanId, {
      waitUntil: 'networkidle2'
    });
    await sleep(1000)
    const result = await page.evaluate(() => {
      var $ = window.$
      var it = $('.related-pic-video')
      if (it && it.length > 0) {
        var link = it.attr('href')
        var cover = it.find('img').attr('src')
        return {
          link,
          cover
        }
      }
      return {}
    })
    let video
    if (result.link) {
      await page.goto(result.link, {
        waitUntil: 'networkidle2'
      })
      await sleep(2000)
      video = await page.evaluate(() => {
        var $ = window.$
        var it = $('source')
        if (it && it.length > 0) {
          return it.attr('src')
        }
        return ''
      })
    }
    const data = {
      video,
      doubanId,
      cover: result.cover
    }
    await browser.close();
    process.send(data)
    process.exit(0)
  } catch (error) {
    console.log(error)
  }
})();
