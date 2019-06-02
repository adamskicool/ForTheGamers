const data_model = require('./../models/data-model.js');


module.exports = (socket, io) => {

    socket.on('COMMENT_FOCUS_REQUEST', data => {
        console.log("FOCUS");
        io.emit('COMMENT_FOCUS', data);
    });

    //Event när någon kommenterar
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