const loginRouter = require("express").Router()
const MyDb = require("../db/my_db")
const { createToken } = require("../utils/jwtAuth")
const path = require("path")

MyDb.create("../db/users.txt")

loginRouter.route("/")
  .post((req, res, next) => {
    const user = MyDb.findData("email", req.body.email)
    if (user && user.password === req.body.password) {
      const userData = { ...user }
      delete userData.password
      const token = createToken(userData)
      res.send({ token, username: user.username })
      return
    }
    res.status(401).send("User not authorized!")
  })
  .get((req, res) => {
    res.sendFile(path.resolve("./public", "login", "index.html"))
  })

module.exports = loginRouter