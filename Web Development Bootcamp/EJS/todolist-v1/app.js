// node packages
const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')
const port = 3000

const app = express()

// body-parser setup
app.use(bodyParser.urlencoded({
  extended: true
}))

// allows the server to use the public folder
app.use(express.static("public"))


// arrays for the lists
const items = []
const workItems = []

// ejs setup
app.set('view engine', 'ejs')

// routes
app.get('/', (req, res) => {
  let day = date.getDay()
  res.render('list', {listTitle: day, newListItems: items})
})

app.get('/work', (req, res) => {
  res.render('list', {listTitle: "Work List", newListItems: workItems})
})

// callback methods
app.post('/', (req, res) => {
  let item = req.body.newItem
  items.push(item)
  res.redirect('/')
})

app.post('/work', (req, res) => {
  let item = req.body.newItem
  if(req.body.list === 'Work') {
    workItems.push(item)
    res.redirect('/work')
  } else {
    items.push(item)
    res.redirect('/')
  }
})

// listen method aka server startup
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
