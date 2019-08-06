const express = require('express')
const cors = require('cors')
const http = require('http')
const app = express()
const server = http.Server(app)
const io = require('socket.io')(server);
app.use(cors());

// //Serve the static files from the dist-folder, a.k.a. our vue-projects client files.
app.use(cors());
app.use(express.static('dist'));

//setup use of the REST-API controller.
const rest = require('./controllers/rest-controller.js');
app.use('/api', rest);

//setup use of the socket.io controller
const socket_controller = require('./controllers/socket-controller.js');



/**
Datastructure for handling logged in clients
*/
class logged_in_clients {
    constructor() {
        this.clients = {} //pairs consisting of, 1. logged in client id 2. corresponding socket ID. 
    }
    getClient(clientID) {
        if (this.clients[clientID] != null) {
            return this.clients[clientID]
        } else {
            return null
        }
    }
    addClient(clientID, socketID) {
        this.clients[clientID] = socketID
    }
    removeClientByID(clientID) {
        delete this.clients[clientID]
    }
    removeClientBySocket(socketID) {}
    toString() {
        console.log(this.clients)
    }
}

let clients = new logged_in_clients()

var cookie = require('cookie');

io.on('connect', (socket) => {
    console.log("Connected: " + socket.id);
    
    if(socket.handshake.headers.cookie != undefined) {
        //parse the cookie
        let cookies = cookie.parse(socket.handshake.headers.cookie)
        //if there is an id present, that is there is a user logged in, add the client to the logged_in_clients datastructure.
        if(cookies.id != undefined) {
            clients.addClient(cookies.id, socket.id)
        }
    }
    
    // console.log(socket);
    socket_controller(socket, io, clients);
})

//Start listening on port 8989 (if running locally) otherwhise the process.env.PORT.
const PORT = 8989
server.listen(process.env.PORT || PORT, () => console.log(`Server listening on Port ${PORT}`))
