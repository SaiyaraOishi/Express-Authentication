const express= require("express");
const mysql= require("mysql");
const dotenv= require("dotenv");
const path= require("path");

dotenv.config({ path: './.env'});

const app =express();

//Db connection method
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});

const publicDirectory= path.join(__dirname, './public');
app.use(express.static(publicDirectory));
//Wrapping data from any forms
app.use(express.urlencoded({extended: false}));
//parse JSON
app.use(express.json());
app.set('view engine', 'hbs');

//Error checking in DB connection
db.connect((error) => {
    if(error){
        console.log("Error.")
    }
    else {
        console.log("MySQL Connected.....")
    }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
//Creating port
app.listen(5000, () =>{
    console.log("Server started at port 5000.");
});