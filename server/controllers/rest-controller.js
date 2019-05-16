const express = require('express');
const app = express();

//setup to be able to user the post-body parser:
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//import dcrypt for hashing passwords.
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//import regex for email-checking
const emailRegex = require('email-regex');

//import script for communication with the database.
const data_model = require('./../models/data-model.js');


/**
 * Function for handling possible errors that might occur. 
 */
let error = (err, message, res) => {
    if (err) {
        res.json({ success: false, message: message })
    }
}

app.get('/test', (req, res) => {
    //hämta parametrar från request-body.

    //kolla att lösenorden är samma.

    //kolla att användaren inputtat en valid mailadress.

    //ifall lösenorden är samma, hasha lösenordet och kalla på data_model.addUser


    data_model.getGroupMessages(2)
        .then(rows => res.json(rows[0]))
        .catch(err => error(err, "failed to create new user", res))
})

const { processMessages, processComments } = require('../models/middleware/processing.js');

app.get('/messages', (req, res) => {
    //hämta id:n som skickats med requesten.
    let userid = req.headers.userid;
    console.log('GET /messages    userID: ' + userid);
    data_model.getGroupMessages(userid)
        .then(rows => processMessages(rows[0]))
        .then(result => res.json(result))
        .catch(err => error(err, "Failed to get messages", res))
})


app.get('/posts', (req, res) => {
    let userid = req.headers.userid;
    console.log('GET /posts    userID: ' + userid);
    data_model.getPosts(userid)
        .then(rows => rows[0])
        .then(result => res.json(result))
        .catch(err => error(err, "Failed to get posts for user", res))
})

app.post('/post', (req, res) => {
    //TODO: lägg till en ny post!
})

/**
 * Get the comments to a certain post.
 */
app.get('/comments', (req, res) => {
    let postid = req.headers.postid;
    console.log('GET /comments     postID: ' + postid);
    data_model.getComments(postid)
        .then(rows => processComments(rows[0]))
        .then(result => res.json(result))
        .catch(err => console.log(err))//error(err, "Failed to get comments for post", res))
})



module.exports = app;
