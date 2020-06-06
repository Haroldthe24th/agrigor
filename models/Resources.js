const mongoose = require("mongoose")
//db or rss resources
const schema = mongoose.Schema({
  name: String,
  providerLink: String,
  type: Array,
  url: String,
})

module.exports = mongoose.model("Resources", schema)