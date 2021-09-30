const signinRouter = require("express").Router()
const MyDb = require("../db/my_db")
const validator = require("../utils/validator")
const { createToken } = require("../utils/jwtAuth")


signinRouter.post("/",async function login(req, res) {
  try {
    const user = MyDb.findData("email", req.body.email)
    if (user) throw new Error("User already exist")  
    if (validator.validate(req.body, ["email", "password", "username"])) {
      await MyDb.addData({ email: req.body.email, password: req.body.password, username: req.body.username })
      const userData = { ...user }
      delete userData.password
      const token = createToken(userData)
      
      res.send({ 
        username: req.body.username,
        token
      })
    } else throw new Error("User data not correct")
  } catch(err) {
    console.log('Err:', err)
    res.status(400).send(err.message)
  }
})

module.exports = signinRouter