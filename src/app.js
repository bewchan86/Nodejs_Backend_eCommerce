require('dotenv').config()
const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()

// console.log(`Process::`,process.env)
//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//init db
require('./dbs/init.mongodb')
const { checkOverload } = require('./helpers/check.connect')

// checkOverload()
//init routes
app.use('/',require('./routers'))
// app.get('/', (req, res,next) => {
//     const strCompress = 'Hello Fantipsjs'
//     return res.status(202).json({
//         message: "Wellcome Fantipjs",
//         metadata: strCompress.repeat(10000)
//     })
// })
//handling errors

module.exports = app