require('dotenv').config()
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const emailAddress = req.body.email
  const data = {
    members: [{
      email_address: emailAddress,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }
  const jsonData = JSON.stringify(data)
  const url = process.env.URL
  const options = {
    method: 'POST',
    auth: process.env.API_KEY
  }
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    } else {
      res.sendFile(__dirname + '/failure.html')
    }
    response.on('data', (data) => {
      console.log(JSON.parse(data))
      console.log(response.statusCode)
    })
  })
  request.write(jsonData)
  request.end()
})

app.post('/success', (req, res) => {
  res.redirect('/')
})

app.post('/failure', (req, res) => {
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started')
})
