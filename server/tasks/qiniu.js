// let movies = [
//   {
//     video: "http://vt1.doubanio.com/201801311509/2ceb0baf824e6453943f9f8fa586725f/view/movie/M/302240705.mp4",
//     doubanId: "27090813",
//     poster: "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2508472121.jpg",
//     cover: "https://img3.doubanio.com/img/trailer/medium/2506861035.jpg?"
//   }
// ];

const qiniu = require('qiniu') // 七牛图床SDK
const nanoid = require('nanoid') // 随机key生成器
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)
const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({key})
        } else {
          reject(info)
        }
      }
    })
  })
};

(async () => {
  let movies = [
    {
      video: "http://vt1.doubanio.com/201801311509/2ceb0baf824e6453943f9f8fa586725f/view/movie/M/302240705.mp4",
      doubanId: "27090813",
      poster: "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2508472121.jpg",
      cover: "https://img3.doubanio.com/img/trailer/medium/2506861035.jpg?"
    }
  ];
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始传 video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传 cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        console.log('开始传 poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')
        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }
        console.log(movie)
      } catch (err) {
        console.log(err)
      }
    }
  })
})()
