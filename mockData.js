"use strict";

db = connect('localhost:27017/innovationHub');

// create collections
db.createCollection('innovations');
db.createCollection('comments');
db.createCollection('likes');
var innovations = [];


var insertInnovations = db.innovations.insert(
    [{
            title: 'Innovation 1',
            description: 'This is innovation 1s description and has some nice text here',
            image: 'https://static.pexels.com/photos/325229/pexels-photo-325229.jpeg',
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 1',
            userEmail: 'User1@mock.com',
            likes: 4,
            dislikes: 1,
            popularity: 5
        },
        {
            title: 'Innovation 2',
            description: 'This is innovation 2s description and has some nice text here',
            image: 'https://static.pexels.com/photos/203213/pexels-photo-203213.jpeg',
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 2',
            userEmail: 'User2@mock.com',
            likes: 20,
            dislikes: 50,
            popularity: 2
        },
        {
            title: 'Innovation 3',
            description: 'This is innovation 3s description and has some nice text here',
            image: 'https://static.pexels.com/photos/248850/pexels-photo-248850.jpeg',
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 3',
            userEmail: 'User3@mock.com',
            likes: 100,
            dislikes: 50,
            popularity: 8
        }
    ]
)

db.innovations.find({}, {
    _id: 1
}).forEach(function(innovation) {
    innovations.push(innovation._id);
});


var insertComments = db.comments.insert(
    [{
            parentid: innovations[0],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 3',
            userEmail: 'User3@mock.com'
        },
        {
            parentid: innovations[0],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 2',
            userEmail: 'User2@mock.com'
        },
        {
            parentid: innovations[0],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 1',
            userEmail: 'User1@mock.com'
        },
        {
            parentid: innovations[1],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 1',
            userEmail: 'User1@mock.com'
        },
        {
            parentid: innovations[1],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 3',
            userEmail: 'User3@mock.com'
        },
        {
            parentid: innovations[2],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 2',
            userEmail: 'User2@mock.com'
        },
        {
            parentid: innovations[2],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 2',
            userEmail: 'User2@mock.com'
        },
        {
            parentid: innovations[2],
            text: "This is a comment with a bunch of text just for some show",
            CreatedDate: ISODate(),
            ModifiedDate: ISODate(),
            user: 'Mock User 3',
            userEmail: 'User3@mock.com'
        },
    ]
);

var insertLikes = db.likes.insert(
    [{
            parentid: innovations[0],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[0],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[0],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[0],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[0],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[0],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[0],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[1],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[1],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            tCreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
        {
            parentid: innovations[2],
            CreatedDate: ISODate(),
            ModifiedDate: ISODate()
        },
    ]
);
