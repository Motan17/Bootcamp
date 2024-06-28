const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mysql = require('mysql2');


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
});
// 4.
conn.connect((err => {
    if (err) throw err;
    console.log('MySQL Connected');
}));


exports.databaseConnection = conn;
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'contact',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

const app = express();
const port = 3001;

// Middleware setup
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
app.use(express.urlencoded({ extended: true }));

module.exports = {
    app,
    port,
    conn,
};