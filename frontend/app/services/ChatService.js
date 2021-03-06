Chat.App.factory('Chat', function($rootScope) {

    // this array holds all of our message lines
    var lineCollection = [],
        username = '';

    // connect to socket.io
    var socket = io.connect('http://10.0.0.7:1337');

    socket.on('backlog', function(lines) {
        // clear array without losing the reference
        lineCollection.splice(0, lines.length - 1);
        // add new lines to our lines array
        lines.forEach(function(line) {
            lineCollection.push(line);
        });
        // call apply to tell angular to check for changed data
        $rootScope.$apply();
    });

    socket.on('message', function(line) {
        // add line to lines
        lineCollection.push(line);
        // call apply to tell angular to check for changed data
        $rootScope.$apply();
    });

    socket.on('username', function(newUsername) {
        username = newUsername;
        $rootScope.$apply();
    })

    return {
        /**
         * Get all lines
         * @returns {Array}
         */
        getLines: function() {
            return lineCollection;
        },
        /**
         * Send a message
         * @param text
         */
        send: function(text) {
            socket.emit('message', text);
        },

        getUsername: function() {
            return username;
        }
    };
});