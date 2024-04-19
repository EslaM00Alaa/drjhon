
require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT,
  isReady = require("./database/dbready"),
  client = require("./database/db");


  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
 




  
  app.use('/patients',require("./routes/patients/patient"));

app.get('/', (req, res) => res.send('Hello World!'))














client.connect().then(async() => {
    console.log("psql is connected ..");
    app.listen(port, () => console.log(`server run on port ${port} ...... `));
    await isReady();
  });
  