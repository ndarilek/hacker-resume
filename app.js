var express = require("express"),
  path = require("path"),
  logger = require("morgan")

const routes = require("./routes")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.static(path.join(__dirname, "public")))

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render("error", {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render("error", {
    message: err.message,
    error: {}
  })
})

app.listen(8000, () => console.log("Listening on port 8000"))

module.exports = app
