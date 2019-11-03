CREATE TABLE users (
	userID INTEGER AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(1000),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profilePicture VARCHAR(1000),
    backgroundPicture VARCHAR(1000),
    PRIMARY KEY(userid)
);

CREATE TABLE games (
	gameID INTEGER AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    PG INTEGER,
    PRIMARY KEY (gameID)
);

CREATE TABLE hasGame (
	userID INTEGER,
    gameID INTEGER,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (gameID) REFERENCES games(gameID)
);

CREATE TABLE gameGenres (
	genreID INTEGER AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY(genreID)
);

CREATE TABLE hasGenre (
	gameID INTEGER,
    genreID INTEGER,
    FOREIGN KEY (gameID) REFERENCES games(gameID),
    FOREIGN KEY (genreID) REFERENCES gameGenres  (genreID)
);

CREATE TABLE areFriends (
	friendshipID INTEGER,
	user1 INTEGER,
    user2 INTEGER,
    becameFriends TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (friendshipID),
    FOREIGN KEY (user1) REFERENCES users(userID),
    FOREIGN KEY (user2) REFERENCES users(userID)
);

CREATE TABLE friendRequests (
	requestID INTEGER NOT NULL AUTO_INCREMENT,
	fromUser INTEGER,
    toUser INTEGER,
    accepted TINYINT(1) NOT NULL DEFAULT 0,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (requestID),
    UNIQUE KEY (fromUser, toUser),
	FOREIGN KEY (fromUser) REFERENCES users(userID),
    FOREIGN KEY (toUser) REFERENCES users(userID)
);


CREATE TABLE posts (
	postID INTEGER AUTO_INCREMENT,
    clanID INTEGER,
    userID INTEGER,
    message VARCHAR(1000),
    imageURL VARCHAR(1000),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (clanID) REFERENCES clans(clanID),
    PRIMARY KEY (postID)
);

CREATE TABLE postComments (
	postCommentID INTEGER AUTO_INCREMENT,
    userID INTEGER,
    postID INTEGER,
    message VARCHAR(1000),
    commentedComment INTEGER,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (commentedComment) REFERENCES postComments (postCommentID),
    PRIMARY KEY (postCommentID)
);

CREATE TABLE companies (
	companyID INTEGER AUTO_INCREMENT,
    companyName VARCHAR(1000),
    password VARCHAR(1000),
    companyWebbsiteURL VARCHAR(1000),
    companyLogoURL VARCHAR(1000),
    PRIMARY KEY(companyID)
);

CREATE TABLE giveAways (
	giveAwayID INTEGER AUTO_INCREMENT,
    companyID INTEGER,
    title VARCHAR(100),
    smallDescription TEXT NOT NULL,
    largeDescription TEXT NOT NULL,
	endDate TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (companyID) REFERENCES companies (companyID),
    PRIMARY KEY (giveAwayID)
);

CREATE TABLE giveAwayContestants (
	giveAwayID INTEGER,
    userID INTEGER,
    FOREIGN KEY (giveAwayID) REFERENCES giveAways (giveAwayID),
    FOREIGN KEY (userID) REFERENCES users (userID),
    PRIMARY KEY (giveAwayID, userID)
);

CREATE TABLE giveAwayImages (
	giveAwayID INTEGER,
    giveAwayImage TEXT,
    FOREIGN KEY (giveAwayID) REFERENCES giveAways (giveAwayID)
);

CREATE TABLE clans (
	clanID INTEGER AUTO_INCREMENT,
    name VARCHAR(100),
	logo TEXT,
    backgroundPicture VARCHAR(1000),
    PRIMARY KEY (clanID)
);

CREATE TABLE clanMembers (
	clanID INTEGER,
    userID INTEGER,
    FOREIGN KEY (clanID) REFERENCES clans (clanID),
    FOREIGN KEY (userID) REFERENCES users (userID),
    PRIMARY KEY (clanID, userID)
);





-- For messaging, groups and users

CREATE TABLE groups (
	groupID INTEGER AUTO_INCREMENT,
    groupName TEXT NOT NULL,
    adminID INTEGER,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminID) REFERENCES users(userID),
    PRIMARY KEY(groupID)
);

CREATE TABLE groupAllocation (
	userID INTEGER,
    groupID INTEGER,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (groupID) REFERENCES groups(groupID)
);

CREATE TABLE messages (
	messageID INTEGER AUTO_INCREMENT,
	fromUserID INTEGER,
    toUserID INTEGER DEFAULT NULL,
    toGroupID INTEGER DEFAULT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fromUserID) REFERENCES users(userID),
    FOREIGN KEY (toUserID) REFERENCES users(userID),
    FOREIGN KEY (toGroupID) REFERENCES groups(groupID),
    PRIMARY KEY (messageID)
);





