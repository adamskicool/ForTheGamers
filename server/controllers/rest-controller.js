const express = require('express');
const app = express();

//setup to be able to user the post-body parser:
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//import dcrypt for hashing passwords.
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//setup to be able to use json-webtokens.
const jwt = require('jsonwebtoken');

//import regex for email-checking
const emailRegex = require('email-regex');

//import script for communication with the database.
const data_model = require('./../models/data-model.js');

//secrets
const secrets = require('../secrets/secrets.json');

//OAuth2 client veryfier.
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(secrets.GOOGLE_CLIENT_ID);

/**
 * Function for handling possible errors that might occur. 
 */
let error = (err, message, res) => {
    if (err) {
        res.json({ success: false, message: message })
    }
}

/**
 * POST request that is to be sent after successfully signing in with a google account.
 * This request will add a new user to the DB if it isn't allready there.
 */
app.post('/googleSignIn', (req, res) => {
    let id_token = req.body.id_token;
    client.verifyIdToken({
        idToken: id_token,
        audience: secrets.GOOGLE_CLIENT_ID
    }).then(ticket => ticket.getPayload())
        .then(payload => {
            let googleid = payload['sub'];
            let username = payload['name'];
            let email = payload['email'];
            let profilePicture = payload['picture'];
            console.log(googleid, username, email, profilePicture);

            let response = {
                message: '',
                JWT: null,
                userID: null,
                success: false
            }
            //use the found userid to check the database for existing user, if that user does not exists, add it as a new google user.
            data_model.getUserByGoogleID(googleid)
                .then(rows => rows[0])
                .then(resp => {
                    // console.log(resp);
                    //if no user is found, lets add that user!
                    if (resp.length == 0) {
                        data_model.addGoogleUser(username, email, profilePicture, googleid)
                            .then(_ => {
                                data_model.getUser(username)
                                    .then(rows => rows[0])
                                    .then(resp2 => {
                                        response.success = true
                                        //skapa en JWT med användarnamn och lösenord.
                                        const token = jwt.sign({
                                            id: resp2[0].userID
                                        },
                                            secrets.JWT_SECRET,
                                            {
                                                expiresIn: "4h"
                                            });
                                        // console.log(resp2[0])
                                        response.message = "user found!"
                                        response.JWT = token
                                        response.userID = resp2[0].userID

                                        res.json(response)
                                    })
                            })
                            .catch(err => console.log(err))
                    } else {
                        data_model.getUser(username)
                            .then(rows => rows[0])
                            .then(resp2 => {
                                response.success = true
                                //skapa en JWT med användarnamn och lösenord.
                                const token = jwt.sign({
                                    id: resp2[0].userID
                                },
                                    secrets.JWT_SECRET,
                                    {
                                        expiresIn: "4h"
                                    });
                                // console.log(resp2[0])
                                response.message = "user found!"
                                response.JWT = token
                                response.userID = resp2[0].userID

                                res.json(response)
                            })
                    }
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));
})

/**
 * GET request to verify login details for a user. This method also gives the user who
 * is logging in a JWT for further authentication when using the application.
 */
app.get('/login', (req, res) => {
    //console.log('GET /login')
    let response = {
        message: '',
        JWT: null,
        userID: null,
        success: false
    }
    //kolla ifall användaren med detta lösenord finns i databasen.
    data_model.getUser(req.headers.username)
        .then(rows => rows[0])
        .then(resp => {
            if (resp[0] != undefined) {
                //om vi hittade en användare, kolla att lösenorden matchar.
                bcrypt.compare(req.headers.password, resp[0].password, (err, result) => {
                    if (result) {
                        response.success = true
                        //skapa en JWT med användarnamn och lösenord.
                        const token = jwt.sign({
                            id: resp[0].userID
                        },
                            secrets.JWT_SECRET,
                            {
                                expiresIn: "4h"
                            });
                        response.message = "User found!"
                        response.JWT = token
                        response.userID = resp[0].userID
                        res.json(response)
                    }
                    else {
                        response.message = "Invalid user"
                        res.json(response)
                    }
                })
            } else {
                response.message = "Invalid user"
                res.json(response)
            }
        })
})

/**
 * POST request for adding a new user
 */
app.post('/signup', (req, res) => {
    //////console.log('POST /signup')
    let response = {
        message: '',
    }
    //kolla att alla inputs är med
    if (req.body.username == "" || req.body.email == "" || req.body.password == "" || req.body.password_again == "") {
        response.message = "fill in all information"
        res.json(response)
    } else {
        //försök lägga till denna nya användare i databasen. 
        if (req.body.password == req.body.password_again) {
            //hasha lösenordet och försök lägga till ny användare.
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                //använd hashen för att lägga till en ny användare.
                data_model.addUser(req.body.username, req.body.email, hash)
                    .then(_ => {
                        //skicka response att ny användare är skapad.
                        response.message = "New user " + req.body.username + " has been created!"
                        res.json(response)
                    }).catch(err => {
                        //skicka response att något gick fel.
                        response.message = "Username is taken"
                        res.json(response)
                    })
            })
        } else {
            //skicka tillbaka response att lösenorden inte får vara samma.
            response.message = "Passwords not matching, try again"
            res.json(response)
        }
    }
})



app.get('/authenticate', (req, res) => {
    let JWT_token = req.headers.authentication;
    //console.log(JWT_token)
    let id = req.headers.id;
    jwt.verify(JWT_token, secrets.JWT_SECRET, (err, decoded) => {
        //console.log(err)
        if (!err) {
            //console.log(decoded);
            if (decoded.id == id) {
                res.json({ success: true })
            } else {
                res.json({ success: false })
            }
        } else {
            res.json({ success: false })
        }
    })
})


const { processMessages } = require('../models/middleware/processing.js');

app.get('/user', (req, res) => {
    let userid = req.headers.userid;
    //console.log('GET /user      userID: ' + userid);
    data_model.getUserByID(userid)
        .then(rows => rows[0])
        .then(result => res.json(result[0]))
        .catch(err => error(err, "Failed to get user details", res))
})

/**
 * Get a subset of users dependent on the following query parameters:
 * 1. username
 * 2. Liked games.
 * 3. Mutual friends... maybe... well see.
 */
app.get('/filteredUsers', (req, res) => {
    let searched_username = req.headers.username;
    data_model.getFilteredUsers(searched_username)
        .then(rows => rows[0])
        .then(result => res.json(result))
        .catch(err => error(err, "Failed to get users", res))
})

app.get('/messages', (req, res) => {
    //hämta id:n som skickats med requesten.
    let userid = req.headers.userid;
    //console.log('GET /messages    userID: ' + userid);
    data_model.getGroupMessages(userid)
        .then(rows => processMessages(rows[0]))
        .then(result => res.json(result))
        .catch(err => error(err, "Failed to get messages", res))
})

app.get('/clans', (req, res) => {
    let userid = req.headers.userid;
    //console.log('GET /clans     userID: ' + userid);
    data_model.getClans(userid)
        .then(rows => rows[0])
        .then(result => res.json(result))
        .catch(err => error(err, "Failed to get clans for user", res))
})

app.get('/posts', (req, res) => {
    let userid = req.headers.userid;
    //console.log('GET /posts    userID: ' + userid);
    data_model.getPosts(userid)
        .then(rows => rows[0])
        .then(result => res.json(result))
        .catch(err => error(err, "Failed to get posts for user", res))
})

app.get('/clanPosts', (req, res) => {
    let clanid = req.headers.clanid;
    //console.log('GET /clanPosts     clanID: ' + clanid);
    data_model.getClanPosts(clanid)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "Failed to get posts for clan", res))
})

app.post('/post', (req, res) => {
    let userid = req.body.userid
    let clanid = req.body.clanid
    let message = req.body.message
    let imageURL = req.body.imageURL
    //console.log("POST /post     ", userid, clanid, message, imageURL)
    data_model.addPost(userid, clanid, message, imageURL)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "Failed to post", res))
})

app.post('/comment', (req, res) => {
    //console.log('POST /comment')
    //TODO: lägg till en ny post!
    let postid = req.body.postid
    let userid = req.body.userid
    let message = req.body.message
    let commentedComment = req.body.commentedComment
    //console.log("Post ID: " + postid);
    //console.log("message: " + message);
    //console.log("commentedComment: " + commentedComment);

    data_model.addComment(postid, userid, message, commentedComment);
    res.json({ test: "test" })
})

/**
 * Get all comments and subcomments to a certain post.
 */
// app.get('/comments', (req, res) => {
//     let postid = req.headers.postid;
//     console.log('GET /comments     postID: ' + postid);
//     data_model.getComments(postid)
//         .then(rows => processComments(rows[0]))
//         .then(result => res.json(result))
//         .catch(err => console.log(err))//error(err, "Failed to get comments for post", res))
// })

/**
 * Get all comments to a certain comment and post, if no comment id is null 
 * then it get the base comments for the post.
 */
app.get('/commentsOnComment', (req, res) => {
    let postid = req.headers.postid;
    let commentid = req.headers.commentid;
    //console.log('GET /commentsOnComment    postID: ' + postid + ", commentID: " + commentid);
    //get the comments
    data_model.getCommentsForComment(postid, commentid)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => console.log(err))
})


/**
 * GET the currently running giveaways available.
 */
app.get('/giveAways', (req, res) => {
    //console.log('GET /giveAways');
    data_model.getGiveAways()
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => console.log(err))
})

app.get('/giveAwayImages', (req, res) => {
    let giveAwayID = req.headers.giveawayid;
    //console.log(giveAwayID);
    data_model.getImagesForGiveAway(giveAwayID)
        .then(row => row[0])
        .then(results => res.json(results))
        .catch(err => console.log(err))
})


app.get('/friends', (req, res) => {
    let userid = req.headers.userid;
    data_model.getFriends(userid)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "failed to fetch friends for user with id = " + userid, res))
})


app.get('/friendRequests', (req, res) => {
    //console.log("GET /friendRequests")
    let userid = req.headers.userid;
    data_model.getFriendRequestsToUser(userid)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "Could not get friend requests", res));
})


/**
    Get information on companies.
 */
app.get('/companies', (req, res) => {
    //console.log("GET    /companies")
    data_model.getCompanies()
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "Could not get companies", res));
})

/**
    Get the open user-conversations for a user.
 */
app.get('/userConversations', (req, res) => {
    let userid = req.headers.userid
    data_model.getUserConversations(userid)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "Could not get user conversations", res));
})

/**
    Get the open group-conversations for a user.
 */
app.get('/groupConversations', (req, res) => {
    let userid = req.headers.userid
    data_model.getGroupConversations(userid)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "Could not get user conversations", res));
})

/**
 * Get the messages between two users.
 */
app.get('/conversationMessages', (req, res) => {
    let user1 = req.headers.user1
    let user2 = req.headers.user2
    data_model.getConversationMessages(user1, user2)
        .then(rows => rows[0])
        .then(results => res.json(results))
        .catch(err => error(err, "Could not get conversation messages", res));
})


module.exports = app;
