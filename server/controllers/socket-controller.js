const data_model = require('./../models/data-model.js');


module.exports = (socket, io, logged_in_clients) => {

    socket.on("disconnect", _ => {
        console.log("Disconnected " + socket.id);
    });

    /**
    Emitted by the client when logged in, enables the client socket to get 
    socket related notifications.
    */
    socket.on("USER_LOGGED_IN", data => {
        let parsed_data = JSON.parse(data)
        //add the user to the logged_in_clients
        logged_in_clients.addClient(parsed_data.userID, socket.id)
    });

    /**
    Emitted by the client when logging out, disables the client socket from getting 
    socket related notifications.
     */
    socket.on("USER_LOGGED_OUT", data => {
        let parsed_data = JSON.parse(data)
        //remove the user from the logged_in_clients
        logged_in_clients.removeClient(parsed_data.userID)
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
     * TODO: 
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
                        //TODO: Send to only affected client via socket.io-rooms.
                        io.emit('FRIEND_REQUEST_UPDATE', JSON.stringify(res[0]));
                    })

            }).catch(err => console.log(err))


        //some testing...
        // let data2 = {
        //     requestID: 1,
        //     fromUser: 1,
        //     fromUsername: "adamskicool",
        //     fromProfilePicture: "https://scontent.fbma1-1.fna.fbcdn.net/v/t31.0-8/14444872_1296040327081056_831587077098011298_o.jpg?_nc_cat=107&_nc_oc=AQkuwl0Bvy0Tx6_oRc0YdmU4hk8lJWB5k4JrNACVutR4KSSFFm4vyf_9Al1WZCCKRi0&_nc_ht=scontent.fbma1-1.fna&oh=a2f9cad5dd3b0442889733bfc7b50d06&oe=5D788D4B",
        //     time: "04:54"
        // }
        // socket.emit("FRIEND_REQUEST_UPDATE", JSON.stringify(data2));

    });

    /**
     * Handle incomming friend request acception.
     * data contains: 
     * 1. the id of the accepted request
     */
    socket.on("FRIEND_REQUEST_ACCEPTED", data => {
        /**
         * TODO:
         * 1. Set the boolean for thefriend request status acceptance to '1'.
         * 2. Send a message to the acceptee that it worked or failed
         * 3. Send a message to the request sendee that the request has been accepted
         * OBS! In order to do 3. some rethinking needs to happen regarding how to send info
         *      to specific users. 
         */
    });

    socket.on("FRIEND_REQUEST_DENIED", data => {

    });
}