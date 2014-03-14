var User = require('./user');

var Line = function Line(message, user) {
    this._timestamp = null;
    this._user = null;
    this._text = null;

    this.setTimestamp();
    this.setUser(user);
    this.setText(message);
};

Line.prototype.setTimestamp = function(timestamp) {
    if(timestamp instanceof Date) {
        this._timestamp = timestamp;
    } else {
        this._timestamp = new Date();
    }
};

Line.prototype.setUser = function(user) {
    if(user.constructor instanceof User.constructor) {
        this._user = user;
    } else {
        throw new Error( { msg: "Argument user is not an instance of User." } );
    }
};

Line.prototype.setText = function(text) {
    this._text = text;
};

Line.prototype.getFormattedLine = function() {
    return {
        timestamp   : this._timestamp,
        user        : {
            name: this._user.getName()
        },
        text        : this._text
    }
};

module.exports = Line;