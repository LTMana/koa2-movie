// https://api.douban.com/v2/movie/subject/:id
const rp = require("request-promise-native");

async function fetchMovie(item) {
  const url = `https://api.douban.com/v2/movie/subject/${item.doubanId}`;
  const res = await rp(url);
  return res;
}

(async () => {
  let movies = [
    {
      doubanId: 27008562,
      title: "爱上谎言的女人",
      rate: 6.3,
      poster: "https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2497881869.jpg"
    },
    {
      doubanId: 27017802,
      title: "同妻俱乐部 第四季",
      rate: 9,
      poster: "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2508264812.jpg"
    }
  ];
  movies.map(async (movie) => {
    let movieData = await fetchMovie(movie)
  })
})();
