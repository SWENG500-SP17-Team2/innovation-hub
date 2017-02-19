"use strict";

db = connect('localhost:27017/innovationHub');

// create collections
db.createCollection('innovations');
db.createCollection('comments');
var innovations = [];


var insertInnovations = db.innovations.insert(
    [
        {
            title: 'Innovation 1',
            description: 'This is innovation 1s description and has some nice text here',
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            title: 'Innovation 2',
            description: 'This is innovation 2s description and has some nice text here',
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            title: 'Innovation 3',
            description: 'This is innovation 3s description and has some nice text here',
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        }
    ]
)

db.innovations.find({}, { _id: 1 }).forEach(function(innovation) {
    innovations.push(innovation._id);
});


var insertComments = db.comments.insert(
    [
        {
            parentid: innovations[0],
            text: "This is a comment with a bunch of text just for some show"
        },
        {
            parentid: innovations[0],
            text: "This is a comment with a bunch of text just for some show"
        },
        {
            parentid: innovations[0],
            text: "This is a comment with a bunch of text just for some show"
        },
        {
            parentid: innovations[1],
            text: "This is a comment with a bunch of text just for some show"
        },
        {
            parentid: innovations[1],
            text: "This is a comment with a bunch of text just for some show"
        },
        {
            parentid: innovations[2],
            text: "This is a comment with a bunch of text just for some show"
        },
        {
            parentid: innovations[2],
            text: "This is a comment with a bunch of text just for some show"
        },
        {
            parentid: innovations[2],
            text: "This is a comment with a bunch of text just for some show"
        },
    ]
);
