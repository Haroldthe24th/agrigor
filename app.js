var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose"); // new
const bodyParser = require("body-parser"); // new

var cors = require("cors");
var indexRouter = require("./routes/index");
var statsRouter = require("./routes/stats");
var postsRouter = require("./routes/posts");
var hateRouter = require("./routes/hate");
var resourcesRouter = require("./routes/resources");
var userRouter = require("./routes/user");
var app = express();
// Connect to MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/node_db", { useNewUrlParser: true })
  .catch((e) => {
    console.log(e);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//CORS
app.use(cors());

//******
//routes
//******
app.use("/", indexRouter);
app.use("/api/stats", statsRouter);
app.use("/posts", postsRouter);
app.use("/hate", hateRouter);
app.use("/resources", resourcesRouter);
//app.use("/user", userRouter)
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

//serve static assets if production
if (app.get("env") === "production") {
  app.use(express.static("react/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "react", "build", "index.html"));
  });
}

/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
