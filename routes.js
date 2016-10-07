var exec = require("child_process").exec
var express = require('express')
var router = express.Router()
var gitBackend = require("git-http-backend")

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.get("/publicId", (req, res) => {
  const sessionId = req.headers["x-sandstorm-session-id"]
  exec(`getPublicId ${sessionId}`, (err, rv) => {
    if(err) {
      return console.log(err)
    }
    const lines = rv.split("\n")
    const publicId = lines[0]
    const hostname = lines[1]
    const domain = publicId+"."+hostname
    const url = lines[2]
    res.render("publicId", {
      domain: domain,
      publicId: publicId,
      url: url
    })
  })
})

router.get("/git", (req, res) => {
  const b = gitBackend(req.url)
  req.pipe(b).pipe(res)
})

module.exports = router;
