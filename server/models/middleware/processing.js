


module.exports = {

    /**
     * Function that processes the messages recieved from the database.
     * By process means grouping the messages into categories based on the 
     * message sender.
     */
    processMessages: (messages) => {
        //console.log(messages);
        let processed = {}
        for (var i = 0; i < messages.length; i++) {
            //hitta vilken grupp meddelandet var skickat till.
            let toGroup = messages[i].toGroupID

            if (processed[toGroup] != null) {
                processed[toGroup].messages.push(messages[i])
            } else {
                processed[toGroup] = { groupID: toGroup, messages: [] };
                processed[toGroup].messages.push(messages[i])
            }
        }
        //console.log(processed)
        return processed
    },

    /**
     * Function that processes the comments so that they are aligned in a json-file
     * in sort-of a recursive manner, where a comments has comments, and those comments
     * can in turn have commenets etc...
     */
    processComments: (comments) => {
        //console.log(JSON.stringify(comments))
        let processed = { postComments: {}, commentComments: {} }
        // console.log(comments);
        for (var i = 0; i < comments.length; i++) {
            //hämta den nuvarande kommentaren
            let comment = comments[i]
            comment.comments = []

            if (comment.commentedComment != null) {
                let subComment = processed.commentComments[comment.commentedComment]
                if (subComment == null) {
                    processed.commentComments[comment.commentedComment] = []
                }
                processed.commentComments[comment.commentedComment].push(comment)
            } else {
                processed.postComments[comment.postCommentID] = comment;
            }

        }
        console.log(Object.keys(processed.commentComments))
        // console.log(processed)
        //gå igenom resultatet och gör det till ett träd.
        let processed_tree = {}
        Object.keys(processed.postComments).forEach((postID) => {
            let comment = processed.postComments[postID]
            // console.log(comment);
            traverseTree(comment, processed.commentComments)
            processed_tree[postID] = comment
        })
        //console.log(JSON.stringify(processed));
        return processed_tree;
    }

}


const traverseTree = (startNode, nodes) => {
    //postCommentID för startnoden
    // console.log(startNode)
    let startNodeID = startNode.postCommentID
    //get the comments belonging to that postComment.
    let commentsStartNode = nodes[startNodeID]
    // console.log(commentsStartNode)

    if (commentsStartNode != null) {
        // console.log(Object.keys(commentsStartNode));
        //go through all those comments)
        commentsStartNode.forEach((comment) => {
            // console.log(Object.keys(nodes));
            console.log("ID: " + comment.postCommentID)


            let newStartNode = comment
            if (newStartNode != null) {
                // console.log(newStartNode)
                traverseTree(newStartNode, nodes)
            }
        })
        startNode.comments = commentsStartNode
    }
}