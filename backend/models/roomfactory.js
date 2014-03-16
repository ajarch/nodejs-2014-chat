var Room = require('./room');

/**
 * When called, creates a closure that returns a factory method
 * The return function expects an argument which is the key of the room
 *
 * @returns {Function} factory method
 */
function roomFactory() {
    var rooms = {};

    return function(roomname) {
        if(!rooms[roomname]) {
            rooms[roomname] = new Room(roomname, []);
        }

        return rooms[roomname];
    }
};

var newRoomFactory = roomFactory();

module.exports = newRoomFactory;
