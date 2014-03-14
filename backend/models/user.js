var Error = require('./error');
var Room = require('./room');
var Line = require('./line');
var roomFactory = require('./roomfactory');

var User = function User(name, socket) {
    this._name = null;
    this._socket = null;
    this._currentRoom = null;

    if( typeof name === "undefined" || typeof socket === "undefined") {
        throw new Error({ msg: "Illegal constructor."});
    }

    if(name === "") {
        name = this.getRandomName();
    }
    
    this.setName(name);

    this.setSocket(socket);

    this.setCurrentRoom(roomFactory("lobby"));
};

User.prototype.setName = function(name) {
    if(typeof name === "string") {
        var oldName = this._name;
        this._name = name;
        if(this.getCurrentRoom()) {
            this.getCurrentRoom().sendSystemMessage(oldName + " is now known as " +  this.getName());
        }
        if(this._socket) {
            this._socket.emit('username', this.getName());
        }
    } else {
        throw new Error( { msg: "Argument name is not a string." });
    }
};

User.prototype.getName = function() {
    return this._name;
};

User.prototype.getRandomName = function() {
    return "User-" + Math.floor(Math.random() * 1000);
};

User.prototype.setSocket = function(socket) {
    this._socket = socket;
    this._socket.on("message", function(message) {
        if(message[0] == "/") {
            this.handleCommandMessage(message);
        } else {
            this._currentRoom.messageReceived.call(this._currentRoom, message, this );
        }
    }.bind(this));
};

User.prototype.handleCommandMessage = function(message) {
    if(message.substr(1, 4) === "join") {
        var roomname = message.split(" ")[1];
        this.changeRoom(roomname);
    } else if(message.substr(1,5) === "leave") {
        var roomname = message.split(" ")[1];
        roomFactory(roomname).leftBy(this);
        
    } else if(message.substr(1,4) === "name") {
        var newName = message.split(" ")[1];
        
        if(typeof newName === "string" && newName !== "") {
            this.setName(newName);   
        }
    }
};

User.prototype.getCurrentRoom = function() {
    if(!this._currentRoom) {
        return false;
    }
    return this._currentRoom;
};

User.prototype.setCurrentRoom = function(room) {

    if(room.constructor instanceof Room.constructor) {
        this._currentRoom = room;
        this._currentRoom.joinedBy(this);
    } else {
        throw new Error({ msg: "room is not instance of Room" });
    }
};

User.prototype.changeRoom = function(roomname) {
    try {
        var oldRoom = this.getCurrentRoom();
        this.setCurrentRoom(roomFactory(roomname));
        oldRoom.leftBy(this);
    } catch(e) {
        console.log(e.msg);
    }
};

User.prototype.message = function(line) {
    this._socket.emit("message", line);
};

User.prototype.backlog = function(backlog) {
    this._socket.emit("backlog", backlog);
};

module.exports = User;