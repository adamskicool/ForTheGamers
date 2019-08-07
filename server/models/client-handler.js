/**
Datastructure for handling logged in clients
*/
class clientHandler {
    //Initialize the client hashmap/dictionary.
    constructor() {
        this.clients = {} //pairs consisting of, 1. logged in client id 2. corresponding socket ID. 
    }
    //Get a client with a specific ID.
    getClient(clientID) {
        if (this.clients[clientID] != null) {
            return this.clients[clientID]
        } else {
            return null
        }
    }
    //add a client to the hashmap/dictionary with their ID and SocketID.
    addClient(clientID, socketID) {
        this.clients[clientID] = socketID
        this.toString();
    }
    //Remove client from hashmap/dictionary by specifying their ID.
    removeClientByID(clientID) {
        delete this.clients[clientID]
        this.toString();
    }
    //Remove client from hashmap/dictionary by specifying their SocketID.
    removeClientBySocketID(socketID) {
        Object.keys(this.clients).forEach((key) => {
            if(this.clients[key] == socketID) {
                delete this.clients[key];
            }
        })
        this.toString();
    }
    //Print list of clients.
    toString() {
        console.log(this.clients)
    }
}