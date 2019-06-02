const data_model = require('./../models/data-model.js');


module.exports = (socket, io) => {

    /*
    Focus request on a comment, this should be sent to all clients that can see this comment.
    Right now this is poorly implemented and should make use of rooms to aviod sending this
    update to all clients, and just send it to the clients that have the comment visible. 
    TODO: Make it scalable by adding room functionality.
    */
    socket.on('COMMENT_FOCUS_REQUEST', data => {
        console.log("FOCUS");
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
            })
    });


}