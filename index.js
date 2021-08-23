const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const appRoutes = require('./routes/appRoutes')
const mysql = require('mysql')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

// app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'ejs')

// Setup DB
mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Nanana')
})
.catch((e) => {
    console.log(e)
}) 

// Connection pool
// const pool = mysql.createPool({
//     connectionLimit: 100, 
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     user: process.env.DB_PASS,
//     database: process.env.DB_NAME
// })
// // Connect to DB
// pool.getConnection((err, connection) => {
//     if(err) {
//         throw err
//     }
//      console.log('Connected as ID ' + connection.threadId)
// })

app.use(appRoutes)

const port = process.env.PORT || 9999
app.listen(port, () => {
    console.log(`APp is running on port ${port}`) 
}) 