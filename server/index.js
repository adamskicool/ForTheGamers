const express = require('express')
const cors = require('cors')
const http = require('http')
const app = express()
const server = http.Server(app)
app.use(cors());

// //Serve the static files from the dist-folder, a.k.a. our vue-projects client files.
// app.use(cors());
// app.use(express.static('dist'));

//setup use of the REST-API controller.
const rest = require('./controllers/rest-controller.js');
app.use('/api', rest);

//setup use of the socket.io controller
// const socket_controller = require('./controllers/socket-controller.js');
// io.on('connect', (socket) => {
//     console.log("New socket connected");
//     socket_controller(socket, io);
// })

//Start listening on port 8989 (if running locally) otherwhise the process.env.PORT.
const PORT = 8989
server.listen(PORT, () => console.log(`Server listening on Port ${PORT}`))
