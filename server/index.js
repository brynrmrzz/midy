const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { readSequences, writeSequence, deleteAll } = require('./controllers/sequences.js')

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
  const sequence = { sequence: req.body }
  writeSequence(sequence)
    .then(() => {
      readSequences()
        .then((dbRes) => {
          res.status(200).send(dbRes)
        })
        .catch(err => res.status(500).send())
    })
    .catch(err => res.status(500).send())
})

app.post('/delete', (req, res) => {
  deleteAll()
    .then(() => {
      readSequences()
        .then((dbRes) => {
          res.status(200).send(dbRes)
        })
        .catch(err => res.status(500).send())
    })
    .catch(err => res.status(500).send())
})

app.listen(port = 3000, () => {
  console.log(`Midy app listening on port ${port}`)
})
