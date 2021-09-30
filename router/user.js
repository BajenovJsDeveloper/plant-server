const userRouter = require("express").Router()
const path = require("path")

userRouter.route("/")
  .get((req, res) => {
    res.sendFile(path.resolve("./public", "user", "index.html"))
  })

userRouter.route("/profile")
  .get((req, res) => {
    res.sendFile(path.resolve("./public", "user", "index.html"))
  })


module.exports = userRouter