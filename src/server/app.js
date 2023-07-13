require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const dbcon = require('./db')
const fs = require('fs')
const config = require('./config')
const cors = require('cors')
const {mode, port, httpCodes} = config
const isDev = (mode === 'development')
// const jwt = require('jsonwebtoken')
const timeout = require('connect-timeout')
const router = require('./routes')

console.log('NODE_ENV: ', process.env.NODE_ENV)

dbcon()
.then( () => {
    console.log('Connected to Mongo db')

    /**
     * ----------------------
     * Create the express app
     * -----------------------
     */
    const app = express()

    /**
     *  CORS
     */
    app.use(cors({
        origin: '*'
    }))

    // Timeout
    // app.use(timeout(config.timeout))

    // Static
    app.use(express.static(path.join(__dirname, 'public')))

    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' })

    // Morgan middleware
    app.use(morgan('combined', { stream: accessLogStream }))
    
    // API routes!
    app.get('/ping', (req,res) => {
        res.status(200).send('Hello world!')
    })
    app.use('/api', express.json(), router)


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        console.log('Handle 404 Not Found error')
        next(createError(httpCodes.notFound))
    })


    /**
     * ------------------------------------
     * Error handling...
     * ------------------------------------
     */

    app.use( (err, req, res, next) => {
        console.log('Fallback error handler... ', err)
        console.log(err.stack)

        const errStatus = err.status || httpCodes.internalError
        const errMessage = err.message || 'Error: ' + err.stack

        if (res.headersSent) {
            return next(err)
        }

        res.status(errStatus)
        res.json({
            success: false,
            error: err.toString()
        })

    })

    app.listen(port, () => {
        console.log('Express is running on port ' + port)       
    })

})
.catch( err => {
    console.error('DB connection error:', err)
    process.exit(1)
})
