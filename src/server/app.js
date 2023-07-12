require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const fs = require('fs')
const debug = require('./debug')
const cookieParser = require('cookie-parser')
const config = require('./config')
const cors = require('cors')
const {mode, name, port, paths, httpCodes, TOKEN_SIGN_SECRET} = config
const dev = (mode === 'development')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const authenticate = require('./middlewares/authenticate')
const logMiddleware = require('./middlewares/log')
const timeout = require('connect-timeout')


console.log('NODE_ENV: ', process.env.NODE_ENV)

require('./db')()
.then( () => {

    console.log('Connected to Mongo db')

    /**
     * ----------------------
     * Create the express app
     * -----------------------
     */
    const app = express()


    /**
     * -------------------------
     * Middlewares...
     * -------------------------
     */
    // app.use(logger(dev ? 'dev' : null))
    app.use(cookieParser())

    /**
     *  CORS
     */
    app.use(cors({
        origin: '*'
    }))

    // Timeout
    // app.use(timeout(config.timeout))

    // Static
    app.use('/', express.static(paths.PUBLIC))

    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream(path.join(paths.ROOT, 'access.log'), { flags: 'a' })
    const errorLogStream = fs.createWriteStream(path.join(paths.ROOT, 'error.log'), { flags: 'a' })

    // Morgan middleware
    app.use(morgan('combined', { stream: accessLogStream }))
    
    // API routes!
    app.get('/ping', (req,res) => {
        res.status(200).send('Hello world!')
    })    


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

        const errStatus = err.status || 500
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
    console.error('connection error:', err)
})
