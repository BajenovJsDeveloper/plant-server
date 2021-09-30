const jwt = require("jsonwebtoken")
const jwtRouter = require("express").Router()

const SECRET = "secret"

function jwtAuth(req, res, next) {
  console.log("Start Middleware...")
  try {
    if (req.headers.authorization && req.headers.authorization) {
      const token = req.headers.authorization.split("Bearer ")[1]
      const decoded = jwt.verify(token, SECRET);

      req.user = decoded.user
      next()
    } else throw new Error("Not authorized user!")
  } catch(err) {
    res.status(401).send(err.message)
  } 
}

function guardWithJwt(router) {
  jwtRouter.use(jwtAuth)
  jwtRouter.use(router)
  return jwtRouter
}

function createToken(data) {
  return jwt.sign({
    user: data
  }, SECRET, { expiresIn: '1h' });
}

module.exports = { guardWithJwt, SECRET, createToken }