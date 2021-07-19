const express = require('express')
const app = express()
const port = 3000

const request = require('request')
const apiOptions = {
  server: 'http://localhost:3000'
}

require('dotenv').config();

const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { response } = require('express')

app.engine('handlebars', exphbs({ defaultLayout: 'layout', handlebars: allowInsecurePrototypeAccess(Handlebars) }))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/zip/:zip', (req, res) => {
  const requestOptions = {
    url: 'https://' + process.env.API_USER + ':' + process.env.API_PASS + '@api.meteomatics.com/now/t_2m:F/postal_US' + req.params.zip + '/json',
    method: 'GET'
  }
  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log(err)
    } else if (response.statusCode === 200) {
      console.log(body)
      res.render('result', {'zip': req.params.zip, 'result': JSON.parse(body).data[0].coordinates[0].dates[0].value})
    } else {
      console.log(response)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})