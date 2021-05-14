const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
// const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'))
// app.set('views', path.join(__dirname, '/views'))
app.use(cors());



MongoClient.connect(
  'mongodb+srv://amadi:amadi747@cluster0.bnf8r.mongodb.net/integral-data',
  {
    useUnifiedTopology: true,
  }
)
  .then((client) => {
    console.log("connected to db");
    const db = client.db("integral-data");
    const integraltable = db.collection("data");




      app.get("/", (req, res) => {
      db.collection("data")
        .find()
        .toArray()
        .then((results) => {
          res.render('index.ejs', { data: results });
        })
        .catch((error) => console.error(`cannot get landing page, ${error}`));
    });

    app.post("/data", (req, res) => {
      integraltable
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => {
          console.error(`cannot post data, ${err}`);
        });
    });

  

     app.put('/data', (req, res) => {
        integraltable.findOneAndUpdate(
          {name :  'jude'},
          {
            $set: {
          name: req.body.name,
          email: req.body.email,
          country: req.body.country
           }
          },
          {
            upsert: true
          }
        )
        .then(result => {
          res.json('Success')
          // console.log(result)
        })
        .catch(error => console.error(`cannt update data,${error}`))
      })

      app.delete('/data', (req, res) => {
        console.log(req.body)
        integraltable.deleteOne(
       {name: req.body.name }
      )
        .then(result => {
           if (result.deletedCount === 0) {
            return res.json('No data to delete')
          }
          res.json(`Deleted Darth Vadar's data`)
        })
        .catch(error => console.error(`cannot delete data, ${error}`))
      })

    })
  .catch((error) => { console.error(`cannot connect to mongodb, ${error}`)});



app.listen(port, () => {
  console.log("server running on port 3000");
});
