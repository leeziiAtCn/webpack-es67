const express = require('express')
const path = require('path')
let app = express()
// app.use(history())
app.use(express.static(path.join(__dirname, './dist')))


app.listen(8080, function (err) {
  if (err) {
    console.log(err)
  }
})