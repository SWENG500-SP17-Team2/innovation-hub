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
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(mongoURL, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database sucessfully connected");

  // Initialize the app.
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

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

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
  newInnovation.createDate = new Date();
  if (!req.body.Name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(INNOVATIONS_COLLECTION).insertOne(newInnovation, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create innovation.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
