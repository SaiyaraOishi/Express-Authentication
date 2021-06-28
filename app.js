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

app.get("/",(req,res) => {
    // res.send("<H1>Home Page</H1>")
    res.render("index");
});

app.get("/register",(req,res) => {
    // res.send("<H1>Home Page</H1>")
    res.render("register");
});

//Creating port
app.listen(5000, () =>{
    console.log("Server started at port 5000.");
});