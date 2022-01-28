// this module calls the Date object, grabs the current Date
// and returns the date in the following format:
//
// Day, Date      for example,   Monday, January 1
exports.getDate = () => {
  const today = new Date()
  const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
  }
  return today.toLocaleDateString('en-US', options)
}

exports.getDay = () => {
  const today = new Date()
  const options = {
  weekday: 'long',
  }
  return today.toLocaleDateString('en-US', options)
}
