var express = require('express');
var router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();
var FeedParser = require('feedparser');
var fetch = require('node-fetch');

const Post = require("../models/Post") // new
const bonsole = require('bonsole');
 

router.get("/", async (req, res) => {


try{
  const feed = await feedparserFoo("https://blogs.findlaw.com/blotter/atom.xml")
bonsole(feed)
  res.send({feed})
  
}
 catch(e) {
  console.log(e)
   }


 })
module.exports = router;
const feedparserFoo = async  (feedUrl) => {
  return new Promise((resolve, reject) => {

console.log("feedUrl", feedUrl)
var req = fetch(feedUrl);
var feedparser = new FeedParser();
 
req.then(function (res) {
  if (res.status !== 200) {
    throw new Error('Bad status code');
  }
  else {
    // The response `body` -- res.body -- is a stream
    res.body.pipe(feedparser);
  }
}, function (err) {
  // handle any request errors
});
const feed = []
 
feedparser.on("error", function (error) {
  // always handle errors
  reject("rip");
});
feedparser.on("end", function (error) {
  // always handle errors
  //return data
  resolve(feed);
});

feedparser.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;
  while (item = stream.read()) {
    console.log("item", Object.keys(item));
  
  feed.push(item);
  }
  console.log("feed.length", feed.length)

})})}

