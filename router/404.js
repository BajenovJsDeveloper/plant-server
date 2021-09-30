const errorPageRouter = require("express").Router()

errorPageRouter.route("*")
  .all((req, res) => {
    res.status(404)
    res.send("<div style='display: flex; justify-content: center; align-items: center; height: 100vh'><h1>Error page 404 | no such page </h1></div>")
  })

module.exports = errorPageRouter