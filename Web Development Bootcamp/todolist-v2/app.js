// node packages
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')

const app = express()

// body-parser setup
app.use(bodyParser.urlencoded({
  extended: true
}))

// allows the server to use the public folder
app.use(express.static("public"))

// mongoose connection
// for security purposes this code has been altered
mongoose.connect('mongodb+srv://' + process.env.LOGIN + '@cluster0.qbmye.mongodb.net/todolistDB')

const itemsSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
  name: 'Welcome to your To Do List!'
})

const item2 = new Item({
  name: 'Hit the + button to add an item'
})

const item3 = new Item({
  name: '<   Hit this to delete an item'
})

const defaultItems = [item1, item2, item3]

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model('List', listSchema)

// ejs setup
app.set('view engine', 'ejs')

// routes
app.get('/', (req, res) => {
  Item.find((err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (!err) {
          console.log('Successfully saved default items to DB')
        }
      })
      res.redirect('/')
    } else {
      res.render('list', {
        listTitle: 'Today',
        newListItems: foundItems
      })
    }
  })
})

// callback methods
app.post('/', (req, res) => {
  const itemName = req.body.newItem
  const listName = req.body.list
  const item = new Item({
    name: itemName
  })

  if (listName === 'Today') {
    item.save()
    res.redirect('/')
  } else {
    List.findOne({
      name: listName
    }, (err, foundList) => {
      if (!err) {
        foundList.items.push(item)
        foundList.save()
        res.redirect('/' + listName)
      }
    })
  }
})

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName

  if (listName === 'Today') {
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (!err) {
        console.log('Successfully deleted document with id ' + checkedItemId + ' in list ' + listName)
      }
      res.redirect('/')
    })
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedItemId
        }
      }
    }, (err, foundList) => {
      if (!err) {
        res.redirect('/' + listName)
      }
    })
  }
})

app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName)

  List.findOne({
    name: customListName
  }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        // Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save()
        res.redirect('/' + customListName)
      } else {
        // Show an existing list
        res.render('list', {
          listTitle: foundList.name,
          newListItems: foundList.items
        })
      }
    }
  })
})
 let port = process.env.PORT
 if (port == null || port == '') {
   port = 3000
 }
// listen method aka server startup
app.listen(port, () => {
  console.log(`Server started`)
})
