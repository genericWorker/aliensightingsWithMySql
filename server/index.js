const express = require("express");
const bodyParser = require("body-parser"); 
const cors = require('cors');  
const app = express();  
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "MyNewPass",
    database: 'cruddatabase'
}); 

    app.use(cors()); 
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended:true})) 

    app.get("/api/get/:id", (req,res) => {
        const id = req.params.id; 
        const sqlSelect = "select * from alienSiting where id = ?";
        db.query(sqlSelect, id,  (err,result) => {
            if (err) {
                console.log(err);
            } 
            else {
                res.send(result);
            }
          });
        }); 

    app.get("/api/getsitings", (req,res) => {
     
        const sqlSelect = "select * from alienSiting";
        db.query(sqlSelect, (err,result) => {
            res.send(result); 
          });
        }); 
 
    app.delete("/api/delete/:id", (req,res) => {
        const id = req.params.id; 
        const sqlDelete = 
        "delete from aliensiting where id = ?"; 
        db.query(sqlDelete, id, (err, result) => {
            if (err) {
                console.log(err);
            } 
            else {
              //  console.log(result);
                res.send("Siting " + id + " deleted.")
            }
        });
    });   

    app.put("/api/update", (req,res) => {
        const name = req.body.movieName; 
        const review = req.body.movieReview; 
        const sqlUpdate = 
        "update movie_reviews set movieReview = ? where movieName = ?"; 
        db.query(sqlUpdate, [review,name], (err,result) => {
            if (err) console.log(err); 
        });
    });  

    app.post("/api/insert", (req,res) => {
      //  res.setHeader("Access-Control-Allow-Origin", "*");
        const date = req.body.date;
        const creatureType = req.body.creatureType;
        const weight = req.body.weight;
        const height = req.body.height;
        const numberEyes = req.body.numberEyes;
        const numberArms = req.body.numberArms;
        const numberLegs = req.body.numberLegs;
        const color = req.body.color;

        const sqlInsert = 
        "insert into aliensiting (date, creatureType, weight, height, numberEyes, numberArms, numberLegs, color) values (?,?,?,?,?,?,?,?)";  
        db.query(sqlInsert, [date, creatureType,weight,height,numberEyes,numberArms, numberLegs, color], (err,result) => {
            console.log(result); 
          });
        }); 


    app.listen(3001, () => {
        console.log("running on port 3001"); 
    });  