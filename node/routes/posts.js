var express = require('express');
var router = express.Router();
const Post = require("../models/Post") // new
const multer = require('multer');
const upload = multer();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.get("/get", async (req, res) => {
  const posts = await Post.find()
  res.send(posts)
})
router.post("/post",upload.none(), async (req, res) => {
	console.log(req.body)
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  })
  await post.save()
  res.send(post)
})
router.get("/get/:id", async (req, res) => {
	try {
  const post = await Post.findOne({ _id: req.params.id })
  res.send(post)
} catch(e) {
   res.status(404)
    res.send({ error: "Post doesn't exist!" })}
})

router.delete("/delete/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})
router.patch("/update/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    console.log(req.body)
    if (req.body.title) {
      post.title = req.body.title
    }

    if (req.body.content) {
      post.content = req.body.content 
    }

    await post.save()
    res.send(post)
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})
module.exports = router;
