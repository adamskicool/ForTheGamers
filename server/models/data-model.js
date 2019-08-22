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
    return connection.promise().query(query)
}

/**
 * Function that return a user with a specific username, this can only return one user since the 
 * username is the primary key in the MySQL database.
 */
exports.getUser = (username) => {
    let query = "SELECT * FROM users WHERE username = '" + username + "'"
    return connection.promise().query(query)
}

/**
 * Function that returns a user with a specific id.
 */
exports.getUserByID = (userid) => {
    let query = "SELECT username, email, created, profilePicture, backgroundPicture FROM users WHERE userID = '" + userid + "'"
    return connection.promise().query(query)
}

/**
 * Function that gets al the messages that has been sent in groups that a certain user is a part of.
 */
exports.getGroupMessages = (userid) => {
    let query = "SELECT * FROM inGroup LEFT JOIN messagessenttogroup ON inGroup.groupID = messagessenttogroup.toGroupID WHERE userID = '" + userid +
        "' ORDER BY timestamp DESC";
    return connection.promise().query(query)
}

/**
 * Function that adds a post to a user.
 */
exports.addPost = (userid, clanid, message, imageURL) => {
    let query = "";
    if (imageURL != null) {
        query = "INSERT INTO posts (userID, clanID, message, imageURL) VALUES ('"
            + userid + "', '"
            + clanid + "', '"
            + message + "', '"
            + imageURL + "');";
    } else {
        query = "INSERT INTO posts (userID, clanID, message, imageURL) VALUES ('"
            + userid + "', '"
            + clanid + "', '"
            + message + "', '');";
    }
    return connection.promise().query(query)
}

/**
 * Get all clans for a specific user
 */
exports.getClans = (userid) => {
    let query = "SELECT * FROM clanMembers LEFT JOIN clans ON clanMembers.clanid = clans.clanid WHERE clanMembers.userid = '" + userid + "';";
    return connection.promise().query(query)
}


/**
 * Get all posts for a specific user
 */
exports.getPosts = (userid) => {
    let query = "SELECT * FROM postwithuserdetails WHERE userID = '" + userid + "';"
    return connection.promise().query(query)
}
/**
 * Get all posts related to a certain clan
 */
exports.getClanPosts = (clanid) => {
    let query = "SELECT * FROM postwithuserdetails WHERE clanID = '" + clanid + "' ORDER BY time DESC;"
    return connection.promise().query(query)
}


/**
 * Get all comments for a specific post
 */
exports.getComments = (postid) => {
    let query = "SELECT * FROM postComments WHERE postID = '" + postid + "' ORDER BY time ASC;";
    return connection.promise().query(query)
}
/**
 * Get all comments for a specific comment, if the commentid == -1, get the base comments.
 */
exports.getCommentsForComment = (postid, commentid) => {
    let query = ""
    if (commentid == -1) {
        //console.log("Base comments");
        query = "SELECT * FROM commentsmoreinfo WHERE postID = '" + postid +
            "' AND commentedComment IS NULL ORDER BY time DESC;"
    } else {
        //console.log("Commented comments");
        query = "SELECT * FROM commentsmoreinfo WHERE postID = '" + postid +
            "' AND commentedComment = '" + commentid + "' ORDER BY time DESC;"
    }

    return connection.promise().query(query)
}
/**
 * Add a comment to a specific comment or sub-comment.
 */
exports.addComment = (postid, userid, message, commentedComment) => {
    let query = "INSERT INTO postComments (userID, postID, message, commentedComment) VALUES "
    if (commentedComment == -1) {
        query += "(" + userid + ", " + postid + ", '" + message + "', null);"
    } else {
        query += "(" + userid + ", " + postid + ", '" + message + "', " + commentedComment + ");"
    }
    console.log(query);
    return connection.promise().query(query)
}

/**
 * Get all the available give-aways.
 */
exports.getGiveAways = () => {
    let query = "SELECT * FROM giveawaysmoreinfo;"
    return connection.promise().query(query)
}
/**
 * Get all images asociated with a certain give-away.
 */
exports.getImagesForGiveAway = (giveAwayID) => {
    let query = "SELECT * FROM giveAwayImages WHERE giveAwayID = " + giveAwayID + ";"
    return connection.promise().query(query)
}

/**
 * Get all friends associated with a certain user.
 */
exports.getFriends = (userid) => {
    let query = "SELECT * FROM "
    return connection.promise().query(query)
}

/**
 * Add a friend request from user1 to user2.
 */
exports.addFriendRequest = (fromUser, toUser) => {
    let query = "INSERT INTO friendRequests (fromUser, toUser) VALUES ('" + fromUser + "', '" + toUser + "');"
    console.log(query)
    return connection.promise().query(query)
}


/**
 * Accept a friend request with a specific id.
 */
exports.acceptFriendRequest = (requestid) => {
    let query = "UPDATE friendRequests SET accepted = '1' WHERE requestID = '" + requestid + "';"
    console.log(query)
    return connection.promise().query(query)
}

/**
 * Remove a friend request with a specific id.
 */
exports.removeFriendRequest = (requestid) => {
    let query = "DELETE FROM friendRequests WHERE requestID = '" + requestid + "';"
    console.log(query)
    return connection.promise().query(query)
}

exports.getFriendRequestByID = (requestid) => {
    let query = "SELECT * FROM friendRequestsMoreInfo WHERE requestID = '" + requestid + "';"
    console.log(query)
    return connection.promise().query(query)
}
/**
 * Get requet from a specific user to another.
 */
exports.getFriendRequest = (fromUser, toUser) => {
    let query = "SELECT * FROM unacceptedFriendRequests WHERE fromUser = '" + fromUser + "' AND toUser = '" + toUser + "';"
    console.log(query)
    return connection.promise().query(query)
}

/**
 * Get friend requests to a specific user.
 */
exports.getFriendRequestsToUser = (userid) => {
    let query = "SELECT * FROM unacceptedFriendRequests WHERE toUser = '" + userid + "';"
    return connection.promise().query(query)
}


/**
 *  Get all company names and associated ID:s!
 */
exports.getCompanies = () => {
    let query = "SELECT companyID, companyName FROM companies;"
    return connection.promise().query(query)
}


/**
 * Get the open user-conversations for a user.
 */
exports.getUserConversations = (userid) => {
    let query = "SELECT * FROM userConversations WHERE toUserID = '" + userid + "';"
    return connection.promise().query(query)
}

exports.getConversationMessages = (user1, user2) => {
    let query = `SELECT * FROM userMessages WHERE  
    (toUserID = '` + user1 + `' AND fromUserID = '` + user2 + `') OR
    (toUserID = '` + user2 + `' AND fromUserID = '` + user1 + `') 
    ORDER BY timestamp DESC;
    `
    return connection.promise().query(query)
}

exports.addUserMessage = (fromUser, toUser, message) => {
    let query =
        `
    INSERT INTO messages (fromUserID, toUserID, message) VALUES (
        '` + fromUser + `',
        '` + toUser + `',
        '` + message + `'
    );
    `
    return connection.promise().query(query)
}