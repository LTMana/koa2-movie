const co = require("co");
const fetch = require("node-fetch");

co(function*() {
  let res = yield fetch("https://api.douban.com/v2/book/1291843");
  let json = yield res.json();
  console.log(json.summary);
});

(async function() {
  let res = await fetch("https://api.douban.com/v2/book/1220562");
  let json = await res.json();
  console.log(json.summary);
})();
