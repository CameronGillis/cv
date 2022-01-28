// Use node.js to start this script

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/bmiCalculator', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html')
})

app.post('/', (req, res) => {
  var num1 = Number(req.body.n1)
  var num2 = Number(req.body.n2)
  var result = num1 + num2
  res.send('The result of the calculation is ' + result)
})

app.post('/bmiCalculator', (req, res) => {
  var weight = parseFloat(req.body.w)
  var height = parseFloat(req.body.h)
  var bmi = weight / (height * height)
  var interpretation
  if (bmi < 18.5) {
    interpretation = 'Your BMI is ' + bmi + ', so you are underweight.'
  }
  else if (bmi >= 18.5 && bmi < 24.9) {
    interpretation = 'Your BMI is ' + bmi + ', so you have a normal weight.'
  }
  else {
    interpretation = 'Your BMI is ' + bmi + ', so you are overweight.'
  }
  res.send(interpretation)
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
