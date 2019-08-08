const data_model = require('./../models/data-model.js');


module.exports = (socket, io, logged_in_clients) => {

    /**
     * Emitted by the client when socket gets disconnected.
     * This can happen in two (maybe more...) cases:
     * 1. If the client is shut down.
     * 2. If the client is inactive for too long.
     * Upon disconnection, remove the client from the connected clients
     * and thereby remove the ability for that client to recieve notifications.
     * The ability to recieve notifications are granted when the socket reconnects.
     */
    socket.on("disconnect", _ => {
        console.log("Disconnected " + socket.id)
        logged_in_clients.removeClientBySocketID(socket.id)
    });

    /**
    Emitted by the client when logged in, enables the client socket to get 
    socket related notifications.
    */
    socket.on("USER_LOGGED_IN", data => {
        let parsed_data = JSON.parse(data)
        //add the user to the logged_in_clients
        logged_in_clients.addClient(parsed_data.userid, socket.id)
    });

    /**
    Emitted by the client when logging out, disables the client socket from getting 
    socket related notifications.
     */
    socket.on("USER_LOGGED_OUT", data => {
        let parsed_data = JSON.parse(data)
        //remove the user from the logged_in_clients
        logged_in_clients.removeClientByID(parsed_data.userid)
    });

    /*
    Focus request on a comment, this should be sent to all clients that can see this comment.
    Right now this is poorly implemented and should make use of rooms to aviod sending this
    update to all clients, and just send it to the clients that have the comment visible. 
    TODO: Make it scalable by adding room functionality.
    */
    socket.on('COMMENT_FOCUS_REQUEST', data => {
        // console.log("FOCUS");
        io.emit('COMMENT_FOCUS', data);
    });

    /*
    Incomming comment, this function handles adding a new comment to the database and then sending 
    an event telling al clients to update the comment with a specific ID.
    TODO: Make it scalable by adding room functionality.
    */
    socket.on('COMMENT_INCOMMING', data => {
        let parsed_data = JSON.parse(data);
        let userid = parsed_data.userid;
        let postid = parsed_data.postid;
        let message = parsed_data.message;
        let commentedComment = parsed_data.commentedComment;
        // console.log("User: " + userid)
        // console.log("PostID: " + postid)
        // console.log("Message: " + message)
        // console.log("Commented Comment ID: " + commentedComment)
        data_model.addComment(postid, userid, message, commentedComment)
            .then(_ => {
                let json = {
                    commentedComment: commentedComment
                }
                io.emit('COMMENT_UPDATE', JSON.stringify(json));
            }).catch(err => console.log(err))
    });


    /**
     * A user sends a friend request to another user.
     * 1. add request via data_model
     * 2. Emit friend request to involved user.
     */
    socket.on("FRIEND_REQUEST_SENT", data => {
        let parsed_data = JSON.parse(data);
        let user1 = parsed_data.user1;
        let user2 = parsed_data.user2;
        //console.log("User " + user1 + " adds user " + user2);
        data_model.addFriendRequest(user1, user2)
            .then(_ => {
                //Get the recently added friend request
                data_model.getFriendRequest(user1, user2)
                    .then(rows => rows[0])
                    .then(res => {
                        //console.log(res);
                        //Send request information to clients
                        let client_socket = logged_in_clients.getClient(user2)
                        console.log(client_socket);
                        if (client_socket != null) {
                            io.to(client_socket).emit('FRIEND_REQUEST_UPDATE', JSON.stringify(res[0]));
                        }
                    })

            }).catch(err => console.log(err))
    });

    /**
     * Handle incomming friend request acception.
     * data contains: 
     * 1. the id of the accepted request
     */
    socket.on("ACCEPTED_FRIEND_REQUEST", data => {
        /**
         * TODO:
         * 1. Set the boolean for thefriend request status acceptance to '1'.
         * 2. Send a message to the acceptee that it worked or failed
         * 3. Send a message to the request sendee that the request has been accepted
         */
        let parsed_data = JSON.parse(data)
        const requestid = parsed_data.requestid
        let accepted_userid = parsed_data.accepted_userid
        data_model.acceptFriendRequest(requestid)
            .then(_ => {
                data_model.getFriendRequestByID(requestid)
                    .then(rows => rows[0])
                    .then(res => {
                        let accepted_user_socketid = logged_in_clients.getClient(accepted_userid)
                        console.log(res);
                        let json = {
                            category: "RECENT_NOTIFICATION",
                            title: "",

                        }
                        io.to(accepted_user_socketid).emit("NOTIFICATION_UPDATE", JSON.stringify(json))
                    })
            }).catch(err => console.log(err))

    });

    /**
     * Handle incomming friend request denied.
     * data contains:
     * 1. the id of the denied request
     */
    socket.on("DENY_FRIEND_REQUEST", data => {
        let parsed_data = JSON.parse(data)
        let requestid = parsed_data.requestid
        let denied_userid = parsed_data.denied_userid
        /**
         * TODO:
         * 1. Remove the associated friend request.
         * 2. Send a message to the deniee that it worked or failed.
         * 3. Send a message to the request sender that the request has been denied
         */
        data_model.removeFriendRequest(requestid)
            .then(_ => {
                let denied_user_socketid = logged_in_clients.getClient(denied_userid)
                if (denied_user_socketid != null) {
                    let json = {
                        "test": "test",
                        "UPDATE_OPTION": "UPDATE_FRIEND_REQUESTS"
                    }
                    io.to(socket.id).emit("NOTIFICATION_UPDATE", JSON.stringify(json))
                    io.to(denied_user_socketid).emit("NOTIFICATION_UPDATE", JSON.stringify(json))
                }
            }).catch(err => console.log(err))
    });
}