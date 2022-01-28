const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fruitsDB')

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This fruit must have a name']
  },
  rating: {
    type: Number,
    min: [1, 'Rating is too low'],
    max: [10, 'Rating is too high']
  },
  review: String
})

const Fruit = mongoose.model('Fruit', fruitSchema)

const fruit = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'Pretty solid'
})

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
})

const Person = mongoose.model('Person', personSchema)

const pineapple = new Fruit({
  name: 'Pineapple',
  rating: 9,
  review: 'Great fruit.'
})

// pineapple.save()

const person = new Person({
  name: 'Amy',
  age: 12,
  favoriteFruit: pineapple
})


// fruit.save()
// person.save()
// const kiwi = new Fruit({
//   name: 'Kiwi',
//   rating: 10,
//   review: 'The best fruit!'
// })
//
// const banana = new Fruit({
//   name: 'Banana',
//   rating: 8,
//   review: 'Pretty good with peanut butter.'
// })
//
// const orange = new Fruit({
//   name: 'Orange',
//   rating: 7,
//   review: 'Juice is great and the fruit is solid.'
// })
//        Insert operation
// Fruit.insertMany([kiwi, orange, banana], (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Successfully saved all the fruits to fruitsDB')
//   }
// })
//        Delete Operation
// Fruit.deleteOne({name: 'Peach'}, (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Successfully deleted the document.')
//   }
// })
//        Find operation
// Fruit.find((err, fruits) => {
//   if (err) {
//     console.log(err)
//   } else {
//     mongoose.connection.close()
//     fruits.forEach(fruit => {
//       console.log(fruit.name)
//     })
//   }
// })
//          Update Operation
// Fruit.updateOne({name: 'Peach'}, (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     mongoose.connection.close()
//     console.log('Successfully updated the document.')
//   }
// })
// Person.deleteOne({ObjectId: "61f1994bf57494c2bb936716" }, (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     mongoose.connection.close()
//     console.log('Successfully deleted the document')
//   }
// })
