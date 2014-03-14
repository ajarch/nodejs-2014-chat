# A small node.js chat application

##Useage
Clone and run `npm install` in the repo directory.
Start the server with `node backend/app.js` and the chat will be available at `localhost:3000`.

##Basic useful feature list:
The Chat uses a IRC-like syntax and is purely command based:

 * Change your name for future messages `/name newname`.
 * Messages are currently stored untill the server restarts.
 * Join the room called "theroom" with `/join theroom`.
 * The first room you find yourself in is called `lobby`.
 * When you join a room, you will receive the backlog of this room.
 
##About
I developed this little chat application at a node.js workshop at my university out of a scaffold by [J. Hollmann](https://github.com/nerdbeere/nodejs-2014-chat).
It is merely an experiment where I tried to write highly modular code with a dedicated OOP approach. Also I tried to apply some nifty (beware of buzzword bingo) design patterns such as a factory method for the list of chatrooms.