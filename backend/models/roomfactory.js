var Room = require('./room');

function roomFactory() {
    var rooms = {};

    return function(roomname) {
        if(!rooms[roomname]) {
            rooms[roomname] = new Room(roomname, []);
        }

        console.log(rooms);

        return rooms[roomname];
    }
};

var newRoomFactory = roomFactory();

module.exports = newRoomFactory;