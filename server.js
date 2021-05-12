const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const port = process.env.PORT || 3000

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cors());


// app.get('/', (req, res) => {
//   res.json(database.data)
// })


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

MongoClient.connect(
  "mongodb+srv://amadi:amadi747@cluster0.bnf8r.mongodb.net/integral ltd?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  }
)
  .then((client) => {
    console.log("connected to db");
    const db = client.db("integral-data");
    const integraltable = db.collection("data");

    app.post("/data", (req, res) => {
      integraltable
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.get("/", (req, res) => {
      db.collection("data")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { data: results });
        })
        .catch((error) => console.error(error));
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
        .catch(error => console.error(error))
      })
  //   app.put('/data', (req, res) => {
  //   // res.json('hellow world')
  //   console.log(req.body)
  // })
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
        .catch(error => console.error(error))
      })

    })
  .catch((error) => { console.error(error)});





app.listen(port, () => {
  console.log("server running on port 3000");
});
