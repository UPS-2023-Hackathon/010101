const config = require('./config')
const mongoose = require('mongoose')

mongoose.set('debug', config.mode !== 'production')

const {db: dbConfig} = config

console.log('The mongodb connection uri: ', dbConfig.endpoint)

// Connect to MongoDB
// ------------------------------------------------------------------------------------

// const db = mongoose.connection

async function main() {
    await mongoose.connect(dbConfig.endpoint, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })    
}

module.exports = main