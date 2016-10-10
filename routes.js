var exec = require("child_process").exec,
  express = require('express'),
  router = express.Router(),
  gitBackend = require("git-http-backend")

router.get('/', (req, res) => res.render("index"));

router.get("/publicId", (req, res) => {
  const sessionId = req.headers["x-sandstorm-session-id"]
  exec(`getPublicId ${sessionId}`, (err, rv) => {
    if(err)
      return res.end(err)
    const lines = rv.split("\n")
    const publicId = lines[0]
    const hostname = lines[1]
    const domain = publicId+"."+hostname
    const url = lines[2]
    const isDemo = lines[3] == "true"
    res.render("publicId", {domain, isDemo, publicId, url})
  })
})

router.use("/git", (req, res) => {
  const b = gitBackend(req.url)
  req.pipe(b)((err, service) => {
    if(err)
      return res.end(err+"\n")
    res.setHeader("content-type", service.type)
    const ps = spawn(service.cmd, "/var/git")
    ps.stdout.pipe(service.createStream()).pipe(ps.stdin)
  }).pipe(res)
})

module.exports = router
