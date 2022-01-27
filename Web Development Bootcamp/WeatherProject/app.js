require('dotenv').config()
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  const query = req.body.cityName
  const apiKey = process.env.API_KEY
  const unit = 'imperial'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units=' + unit
  https.get(url, (response) => {
    console.log('Status Code: ' + response.statusCode)
    response.on('data', (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '.png'
      res.write('<h1>The temperature in '+ query + ' is ' + temp + ' degrees Fahrenheit</h1>')
      res.write('<h2>The weather is currently ' + weatherDescription + '</h2>')
      res.write('<img src = '+ imageURL +'>')
      res.send()
    })
  })
})


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
