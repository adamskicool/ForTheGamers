const connection = require('./../database/connect.js')



let query_callback = (error, results, fields) => {
    if (error) throw error

}
/**
 * Function to add a user to the database, note that this function doesn´t hash the password, it 
 * needs to be hashed beforehand.
 */
exports.addUser = (username, email, password) => {
    let query = "INSERT INTO users (username, email, password) VALUES ('"
        + username + "', '"
        + email + "', '"
        + password + "');"
    //console.log("Query = " + query)
    return connection.promise().query(query);
}



/**
 * Function that gets al the messages that has been sent in groups that a certain user is a part of.
 */
exports.getGroupMessages = (userid) => {
    let query = "SELECT * FROM inGroup LEFT JOIN messagessenttogroup ON inGroup.groupID = messagessenttogroup.toGroupID WHERE userID = '" + userid +
        "' ORDER BY timestamp DESC";
    return connection.promise().query(query);
}

/**
 * Function that adds a post to a user.
 */
exports.addPost = (userid, message, image) => {
    let query = "";
    if (image != null) {
        query = "INSERT INTO posts (userID, message, imageURL) VALUES ('"
            + userid + "', '"
            + message + "', '"
            + image + "');";
    } else {
        query = "INSERT INTO posts (userID, message, imageURL) VALUES ('"
            + userid + "', '"
            + message + "', '');";
    }
    return connection.promise().query(query);
}


/**
 * Get all posts for a specific user
 */
exports.getPosts = (userid) => {
    let query = "SELECT * FROM posts WHERE userID = '" + userid + "';"
    return connection.promise().query(query);
}

exports.getComments = (postid) => {
    let query = "SELECT * FROM postComments WHERE postID = '" + postid + "' ORDER BY time ASC;";
    return connection.promise().query(query);
}