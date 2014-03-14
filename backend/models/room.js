var Error = require('./error');
var User = require('./user');
var Line = require('./line.js');

var Room = function Room(name, backlog) {
    this._name = null;
    this._backlog = [];
    this._users = [];

    try {
        this.setName(name);
        this.setBacklog(backlog);
    } catch(e) {
    }
};

Room.prototype.setBacklog = function(backlog) {
    if(backlog instanceof Array) {
        this._backlog = backlog;
    } else {
        throw new Error({ msg: "Argument backlog is not of type Array" });
    }
};

Room.prototype.getFormattedBacklog = function() {
    var formattedBacklog = [];
    var currentLine;
    for(var i = this._backlog.length -1; i >= 0; i--) {
        currentLine = this._backlog[i];
        formattedBacklog.push(currentLine.getFormattedLine());
    }
    return formattedBacklog;
};

Room.prototype.setName = function(name) {
    if(typeof name === "string") {
        this._name = name;
    } else {
        throw new Error({ msg: "Argument name is not of type String" });
    }
};

Room.prototype.getName = function() {
    return this._name;
};

Room.prototype.addLine = function(line) {
    if(!line instanceof Line) {
        throw new Error({ msg: "Argument line is not of type Line"});
    }

    this._backlog.push(line);
    this.newMessage(line);
};

Room.prototype.sendSystemMessage = function(message) {
    if(typeof message === "string") {
        var theLine = {
            timestamp: new Date(),
            user    : { name: "#" + this.getName() },
            text: message
        };

        this.notifyUsers(theLine);
    }
}


Room.prototype.newMessage = function(line) {
    var theLine = line.getFormattedLine();
    this.notifyUsers(theLine);
}

Room.prototype.notifyUsers = function(formattedLine) {
    for(var i = this._users.length -1; i >= 0; i--) {
        var currentUser = this._users[i];
        currentUser.message(formattedLine);
    }
}


Room.prototype.joinedBy = function(user) {
    if(user.constructor instanceof User.constructor) {
        this._users.push(user);
        user.backlog(this.getFormattedBacklog());
        this.sendSystemMessage(user.getName() + " joined this room");

    } else {
        throw new Error({ msg: "Argument user is not of type String" });
    }
}

Room.prototype.leftBy = function(user) {
    var userIndex = this._users.indexOf(user);
    this._users.splice(userIndex)
    this.sendSystemMessage(user.getName() + " left this room");
}

Room.prototype.containsUser = function(user) {
    return this._users.indexOf(user) !== -1;
}

Room.prototype.messageReceived = function(message, user) {
    if(!user.constructor instanceof User.constructor) {
        throw new Error({ msg: "Argument user is not of type User" });
   
    } else if (!typeof message == "string") {

        throw new Error({ msg: "Argument message is not of type string" });

    }

    var line;
    line = new Line(message, user);
    this.addLine(line);
};

module.exports = Room;