const contactsRouter = require("express").Router()

const contacts = (req, res) => {
  console.log("authorized user: ", req.user)

  res.send("Contacts ...")
}

const profile = (req, res, next) => {
  next(new Error('not implemented'))
}

contactsRouter.route("/")
  .get(contacts)
contactsRouter.route("/profile")
  .get(profile)
  .post(profile)
  .put(profile)
  .delete(profile)

module.exports = contactsRouter