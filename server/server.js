var path = require('path');
var express = require('express');
var morgan = require('morgan');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;



var port = process.argv[2] || 8080;
var databaseName = 'innovationHub';
var mongoURL = 'mongodb://localhost:27017' + '/' + databaseName;


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db;


mongodb.MongoClient.connect(mongoURL, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }


  db = database;
  console.log("Database sucessfully connected");


  var server = app.listen(port)
  console.log('Server listening on port ' + chalk.green(port));
});


morgan.token('color_status', (req, res) => {
    if (res.statusCode < 300) {
        return chalk.green(res.statusCode);
    }
    else if (res.statusCode >= 300 && res.statusCode < 400) {
        return chalk.yellow(res.statusCode);
    }
    else if (res.statusCode > 400) {
        return chalk.red(res.statusCode);
    }
});

app.use(morgan(':remote-addr - ' +
    '[:date] ' +
    chalk.cyan('":method :url ') +
    chalk.gray('HTTP/:http-version" ') +
    ':color_status ' +
    ':res[content-length] ' +
    'time=:response-time ms'));

app.use(express.static(path.join(__dirname + '/../dist')));



var INNOVATIONS_COLLECTION = "innovations";

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


app.get("/api/innovations", function(req, res) {
  db.collection(INNOVATIONS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/innovations", function(req, res) {
  var newInnovation = req.body;

  if (!req.body.Name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {

    newInnovation.CreatedDate = new Date();
    newInnovation.ModifiedDate = new Date();
    newInnovation.Comments = [];
    newInnovation.Likes = [];


    db.collection(INNOVATIONS_COLLECTION).insertOne(newInnovation, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create innovation.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});


app.get("/api/innovations/:id", function(req, res) {

  //TODO Better error message if ID is not found in database
  db.collection(INNOVATIONS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get innovation");
    } else {
      res.status(200).json(doc);
    }
  });
});

//TODO Add in this functionality to update an innovation.  Currently this just wipes the innovation and then puts the update in its place.
// app.put("/api/innovations/:id", function(req, res) {
//   var updateDoc = req.body;
//   delete updateDoc._id;
//   //TODO Change modified date
//   db.collection(INNOVATIONS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to update innovation");
//     } else {
//       updateDoc._id = req.params.id;
//       res.status(200).json(updateDoc);
//     }
//   });
// });

app.delete("/api/innovations/:id", function(req, res) {
  db.collection(INNOVATIONS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete innovation");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
