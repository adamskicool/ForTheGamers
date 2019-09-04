# ForTheGamers - a.k.a. Clandoo

This project consist of a Vue.js client (see client folder) in combination with a Node.js/Express.js/Socket.io server (see server folder). The project aims to create a clan-handling application for gamers who seek to find new friends to play video-games with. The read.me file is structured accordingly:

### Technologies Utilized

For the client the Vue.js SPA Framework has been used together with the state management tool Vuex. The client side uses multiple npm packages to enrich the user experience, for example vue-emoji-mart and vue-socketio.

The server is build using Node.js together with Express.js and Socket.io to setup a REST-full (isch) API in order to communicate with a mySQL database hosted on Google Cloud Platform. Security measures that have been taken in this project consists of hashing passwords for database storage and utilizing JWT (JSON Web Token) to enable secure access to the REST-API:s resources.

### Project Structure

This section covers all the important folders from within the project structure of both the client and the server. This is here to assist in navigating the structure of the project.

client/:

| Folder/File                    | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| dist/                          | Here is where the launch ready code ends up after running the command "npm run build" from the client folder. |
| src/                           | This is the heart of the Vue project, and where most, if not all, of the written code lies. |
| src/assets/                    | Here resides assets to the project, mostly icons in this project. |
| src/views                      | All views for the project.                                   |
| src/components                 | All components for the project. Note that this folder is split up into subfolders when deemed necessary. |
| src/environment_variables.json | This file contains variables used accros the project, for example URL:s used when accessing/fetching data from the REST-API on the server side. |
| src/main.js                    | Entry point of the projects, here the socket connection is setup as well as the Vuex store and the Router. |
| src/router.js                  | File for configuring routes for the Vue Router as well as routing guards. |
| src/store.js                   | File for configuring the Vuex store.                         |

server/:

| Folder/File              | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| controllers/             | Controllers for the Express.js REST-API and Socket.io connection. |
| database/connect.js      | File for configuring the connection with the mySQL database hosted on Google Cloud Platform. |
| dist/                    | The production build of the client which the server serves.  |
| models/data_model.js     | File that utlizes the connect.js file in order to communicate with the database. This file is in turn utlilized from both controllers to query the database. |
| models/client_handler.js | Contains datastructure for handling logged in clients and their respective socket connection. This is here in order to enable for example peer-to-peer messaging. |
| index.js                 | Starting point for the server which can be run by the command "npm start" in the server folder. Here the Express.js server is setup and the controllers are initialized. |