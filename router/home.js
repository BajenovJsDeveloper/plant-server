const homeRouter = require("express").Router()
const path = require("path")

homeRouter.route("/")
  .get((req, res) => {
    res.sendFile(path.resolve("./public", "home", "index.html"))
  })

module.exports = homeRouter