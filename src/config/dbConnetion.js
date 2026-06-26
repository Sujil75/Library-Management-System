const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Server connection established")
    } catch (err) {
        console.log("Server error found: ", err.message)
        process.exit(1)
    }
}

module.exports = connectDb