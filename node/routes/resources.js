var express = require("express");
var router = express.Router();
const Resources = require("../models/Resources"); // new
const multer = require("multer");
const upload = multer();
let Parser = require("rss-parser");
let parser = new Parser();
var FeedParser = require("feedparser");
var fetch = require("node-fetch");
var _ = require("underscore");
const bonsole = require("bonsole");
const fs = require("fs");

function getResources() {
  const rawdata = fs.readFileSync(homePath() + "/routes/resources.json");
  const resources = JSON.parse(rawdata);
  return resources["resources"];
}
function homePath() {
  //returns aboslute path to home
  return require("path").resolve(__dirname, "../");
}
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

function getSrc(string) {
  const srcWithQuotes = string.match(/src\=([^\s]*)\s/)[1];
  const src = srcWithQuotes.substring(1, srcWithQuotes.length - 1);
  bonsole(srcWithQuotes)
  return src;
}
router.get("/getAllResources", async (req, res) => {
  // const resources = await Resources.find();

  const resources = getResources();
  console.log(typeof resources);
  resources.forEach((res, index) => bonsole(res));
  bonsole(resources);
  /**fs.readFile('student.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
}); */
  res.send({
    resources,
  });
});
router.post("/getResources/mixed", upload.none(), async (req, res) => {
  //pass multiple(array of different categories) types of feeds
  try {
    const types = req.body.types;
    const allResources = getResources();
    const resources = [];
    //get all the resources we need to make the requests
    for (const type of types) {
      allResources.forEach((res, index) => {
        if (res.type.includes(type)) {
          resources.push(res);
        }
      }); //await Resources.find({ type: type });
    }

    //flatten resources
    /* const flatResources = [];
    resources.forEach((res, index) => {
      flatResources.push(...res);
    });
    bonsole(flatResources)*/

    //make all the promises
    const promises = [];
    resources.forEach((rc, index) => {
      promises.push(feedparserFoo(rc.url, rc.name, rc.type));
    });
    bonsole(promises);

    //call the promises to resolve or fail
    const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
    //clear out the ones that failed
    const validResults = results.filter((result) => !(result instanceof Error));

    //flatten the array
    const mergedValidResults = [];
    validResults.forEach((res, index) => {
      mergedValidResults.push(...res);
    });
    res.send(_.shuffle(mergedValidResults));
  } catch (e) {
    res.status(404);
    res.send({
      error: "Post doesn't exist!z",
    });
  }
  // get all the resources loop over them and
  //const resources = await Resources.find({ type: [type] });
  //make list of promises...
});
router.get("/getResources/:type", async (req, res) => {
  const type = req.params.type;
  console.log();
  try {
    const resources = [];
    const allResources = getResources();
    allResources.forEach((res, index) => {
      if (res.type.includes(type)) {
        resources.push(res);
      }
    });
    bonsole(resources);
    const promises = [];
    resources.forEach((rc, index) => {
      promises.push(feedparserFoo(rc.url, rc.name, rc.type));
    });
    const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
    const validResults = results.filter((result) => !(result instanceof Error));
    console.log(validResults);

    const mergedValidResults = [];
    validResults.forEach((res, index) => {
      mergedValidResults.push(...res);
    });

    res.send(_.shuffle(mergedValidResults));
  } catch (e) {
    res.status(404);
    res.send({
      error: "Post doesn't exist!z",
    });
  }
});

router.post("/addResource", upload.none(), async (req, res) => {
  console.log(splitter(req.body.type));

  const resources = new Resources({
    url: req.body.url,
    type: splitter(req.body.type),
    name: req.body.name,
    providerLink: req.body.providerLink,
  });
  await resources.save();
  res.send(resources);
});

module.exports = router;

const tgNormalizer = (feedItem, provider, type) => {
  // const provider = feed[0].provider;
  //the gaurdian normalizer
  if (provider === "theguardian") {
    const normalizedItem = {
      creator: feedItem.author == undefined ? "" : feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: feedItem.enclosures[1].url,
    };

    return normalizedItem;
  }
  if (provider === "wired") {
    const normalizedItem = {
      creator: feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: feedItem.image.url,
    };

    return normalizedItem;
  }
  if (provider === "sportingnews") {
    const normalizedItem = {
      creator: feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: feedItem.enclosures[1].url,
    };

    return normalizedItem;
  }

  if (provider === "sportsnet") {
    const normalizedItem = {
      creator: feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: feedItem.enclosures[0],
    };
    return normalizedItem;
  }
  if (provider === "et") {
    const normalizedItem = {
      creator: feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: feedItem.enclosures[0].url,
    };
    return normalizedItem;
  }

  if (provider === "people") {
    const normalizedItem = {
      creator: feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: feedItem.enclosures[0].url,
    };
    return normalizedItem;
  }

  if (provider === "e-ir") {
    const normalizedItem = {
      creator: feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: getSrc(feedItem.description),
      //image in desc src="..."
    };

    return normalizedItem;
  }

  if (provider === "mensjournal") {
    const normalizedItem = {
      creator: feedItem.author,
      title: feedItem.title,
      url: feedItem.link,
      pubDate: feedItem.pubDate,
      description: feedItem.description,
      provider: provider,
      categories: type,
      img: feedItem.enclosures[0].url, //image in desc src="..."
    };

    return normalizedItem;
  }
  return feedItem;
};

const feedparserFoo = (feedUrl, provider, type) => {
  return new Promise((resolve, reject) => {
    // Yay! Everything went well!
    var req = fetch(feedUrl);
    var feedparser = new FeedParser();

    req.then(
      function (res) {
        if (res.status !== 200) {
          throw new Error("Bad status code");
        } else {
          // The response `body` -- res.body -- is a stream
          res.body.pipe(feedparser);
        }
      },
      function (err) {
        // handle any request errors
        //handle error?
        reject(err);
      }
    );
    const feed = [];

    feedparser.on("error", function (error) {
      // always handle errors
      reject("rip");
    });
    feedparser.on("end", function (error) {
      // always handle errors
      //return data
      resolve(feed);
    });

    feedparser.on("readable", function () {
      // This is where the action is!
      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;
      while ((item = stream.read())) {
        //feed.push(tgNormalizer(item, provider));
        //feed.push(tgNormalizer(item, provider));
        bonsole(item);

        feed.push(tgNormalizer(item, provider, type));
      }
    });
  });
};

function splitter(string) {
  //takes a string and splits it up by white pace and returns an array of strings

  return string.split(/(\s+)/).filter(function (e) {
    return e.trim().length > 0;
  });
}

//ProviderUrl=https://www.eschoolnews.com/
//name="eschoolnews"
//url=https://www.eschoolnews.com/feed/
//type=education

//ProviderUrl=http://www.consciouslifestylemag.com/
//name="consciouslifestylemag"
//url=http://www.consciouslifestylemag.com/feed/
//type=lifestyle

//ProviderUrl=https://www.wired.com/
//name="wired"
//url=https://www.wired.com/feed/category/business/latest/rss
//type=business
