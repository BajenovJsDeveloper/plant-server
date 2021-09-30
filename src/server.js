const express = require('express')
const app = express()
const { guardWithJwt } = require("../utils/jwtAuth")
const cors = require("cors")
const port = process.env.DEV_PORT || 3000

app.use(express.json())
app.use(cors())


app.use("/login", require("../router/login"))
app.use("/signin", require("../router/signin"))
app.use("/user", guardWithJwt(require("../router/user")))
app.use("/contacts", guardWithJwt(require("../router/contacts")))
app.use("/", require("../router/home"))
app.use(require("../router/404"))

app.listen(port, () => {
  console.log('Server listening on PORT: ', port)
})