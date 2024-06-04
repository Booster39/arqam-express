
const express = require('express')
const app = express()
const port = 3000
const csv = require('./csvparser')

app.get('/', (req, res) => {
  res.send('Hello World!')
  csv.parse();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
