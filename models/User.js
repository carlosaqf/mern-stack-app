const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
})

// create model class (mongo collection)
// two arguments: the collection name and the collection schema
mongoose.model('users', userSchema)

