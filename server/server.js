var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const config = require('./config');
const passport = require('passport');

var port = process.argv[2] || 8080;

// connect to the database and load models
require('./models').connect(config.dbUri);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var databaseName = 'innovationHub';
var mongoURL = 'mongodb://localhost:27017' + '/' + databaseName;

var db;


mongodb.MongoClient.connect(mongoURL, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }


    db = database;
    console.log("Database sucessfully connected");


    //var server = app.listen(port)
    //console.log('Server listening on port ' + chalk.green(port));
});

// Tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(bodyParser.urlencoded({ extended: true }));

morgan.token('color_status', (req, res) => {
    if (res.statusCode < 300) {
        return chalk.green(res.statusCode);
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
        return chalk.yellow(res.statusCode);
    } else if (res.statusCode > 400) {
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

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const localQueryStrategy = require('./passport/local-query');

const localChangepasswordStrategy = require('./passport/local-changepassword');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('local-query', localQueryStrategy);
passport.use('local-changepassword', localChangepasswordStrategy);
const localUpdateStrategy = require('./passport/local-update');
const localDeleteStrategy = require('./passport/local-delete');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('local-query', localQueryStrategy);
passport.use('local-update', localUpdateStrategy);
passport.use('local-delete', localDeleteStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);
//app.use('/query', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const queryRoutes = require('./routes/query');
const updateRoutes = require('./routes/update');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/query', queryRoutes);
app.use('/update', updateRoutes);

app.listen(port)
console.log('Server listening on port ' + chalk.green(port));

var INNOVATIONS_COLLECTION = "innovations";
var COMMENTS_COLLECTION = "comments";
var LIKES_COLLECTION = "likes";
var DISLIKES_COLLECTION = "dislikes";

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}

/////////////////
//INNOVATIONS////
/////////////////


app.get("/api/innovations", function(req, res) {
    db.collection(INNOVATIONS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get innovations.");
        } else {
            res.status(200).json({
                InnovationDocs: docs
            });
        }
    });
});

app.get("/api/innovations/:id", function(req, res) {

    //TODO Better error message if ID is not found in database
    db.collection(INNOVATIONS_COLLECTION).findOne({
        _id: new ObjectID(req.params.id)
    }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get innovation");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.post("/api/innovations", function(req, res) {
    var newInnovation = req.body;

    if (!req.body.title) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {

        newInnovation.CreatedDate = new Date();
        newInnovation.ModifiedDate = new Date();


        db.collection(INNOVATIONS_COLLECTION).insertOne(newInnovation, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create innovation.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.delete("/api/innovations/:id", function(req, res) {
    db.collection(INNOVATIONS_COLLECTION).deleteOne({
        _id: new ObjectID(req.params.id)
    }, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete innovation");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

app.put("/api/innovations/report/:id", function(req, res) {
    //TODO Better error message if ID is not found in database
    db.collection(INNOVATIONS_COLLECTION).update({
        _id: new ObjectID(req.params.id)
    }, {
        $set: {
            reported: true
        }
    }, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to report innovation");
        } else {
            res.status(200).json(req.params.id)
        }
    })
});


////////////
//COMMENTS//
////////////



app.post("/api/comments", function(req, res) {
    var newComment = req.body;
    console.log(req.body);
    if (!req.body.parentid) {
        handleError(res, "Invalid user input", "Must provide a ParentID.", 400);
    } else if (!req.body.text) {
        handleError(res, "Invalid user input", "Must provide a 'text' field.", 400);
    } else {
        newComment.parentid = new ObjectID(newComment.parentid);
        newComment.CreatedDate = new Date();
        newComment.ModifiedDate = new Date();

        db.collection(COMMENTS_COLLECTION).insertOne(newComment, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create comment.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.get("/api/comments", function(req, res) {
    db.collection(COMMENTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get comments.");
        } else {
            res.status(200).json(docs);
        }
    });
});


app.get("/api/comments/:parentid", function(req, res) {
    //TODO Better error message if ID is not found in database
    db.collection(COMMENTS_COLLECTION).find({
        parentid: new ObjectID(req.params.parentid)
    }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get comments.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.put("/api/comments/report/:id", function(req, res) {
    //TODO Better error message if ID is not found in database
    db.collection(COMMENTS_COLLECTION).update({
        _id: new ObjectID(req.params.id)
    }, {
        $set: {
            reported: true
        }
    }, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to report comment");
        } else {
            res.status(200).json(req.params.id)
        }
    })
});

app.get("/api/comments/report", function(req, res) {
  db.collection(COMMENTS_COLLECTION).find({reported: true}).toArray(function(err, docs) {
      if (err) {
          handleError(res, err.message, "Failed to get report flag");
      } else {
          res.status(200).json(docs);
      }
  })
});
////////////
//LIKES//
////////////


app.post("/api/likes", function(req, res) {
    var newLike = req.body;

    if (!req.body.parentid) {
        handleError(res, "Invalid user input", "Must provide a ParentID.", 400);
    } else {
        newLike.parentid = new ObjectID(newLike.parentid);

        newLike.CreatedDate = new Date();
        newLike.ModifiedDate = new Date();

        db.collection(LIKES_COLLECTION).insertOne(newLike, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create like.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.get("/api/likes", function(req, res) {
    db.collection(LIKES_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get likes.");
        } else {
            res.status(200).json(docs);
        }
    });
});


app.get("/api/likes/:parentid", function(req, res) {
    //TODO Better error message if ID is not found in database
    db.collection(LIKES_COLLECTION).find({
        parentid: new ObjectID(req.params.parentid)
    }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get likes.");
        } else {
            res.status(200).json(docs);
        }
    });
});

////////////
//DISLIKES//
////////////


app.post("/api/dislikes", function(req, res) {
    var newDislike = req.body;

    if (!req.body.parentid) {
        handleError(res, "Invalid user input", "Must provide a ParentID.", 400);
    } else {
        newDislike.parentid = new ObjectID(newDislike.parentid);

        newDislike.CreatedDate = new Date();
        newDislike.ModifiedDate = new Date();

        db.collection(DISLIKES_COLLECTION).insertOne(newDislike, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create dislike.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.get("/api/dislikes", function(req, res) {
    db.collection(DISLIKES_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get dislikes.");
        } else {
            res.status(200).json(docs);
        }
    });
});


app.get("/api/dislikes/:parentid", function(req, res) {
    //TODO Better error message if ID is not found in database
    db.collection(DISLIKES_COLLECTION).find({
        parentid: new ObjectID(req.params.parentid)
    }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get dislikes.");
        } else {
            res.status(200).json(docs);
        }
    });
});


////////////
//USER DATA//
////////////


app.get('/user_data', function(req, res) {
    //console.log(req.user.name);
    if (req.user === undefined) {
        // The user is not logged in
        res.status(200).json({
            username: "undefined user"
        });
    } else {
        res.status(200).json({
            username: req.user
        });
    }
});
