const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { readSequences, writeSequence } = require('./controllers/sequences.js')

const app = express()
app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json())


app.get('/sequences', (req, res) => {
  readSequences()
  .then((dbRes) => {
    res.status(200).send(dbRes)
  })
  .catch(err => res.status(500).send())
})

app.post('/sequences', (req, res) => {
  console.log('This is the request!', req.body)
  const sequence = { sequence: req.body }
  writeSequence(sequence)
  .then(()=>{
    res.status(201).send();
  })
  .catch(err => res.status(500).send())
})

app.listen(port=3000, () => {
  console.log(`Midy app listening on port ${port}`)
})
