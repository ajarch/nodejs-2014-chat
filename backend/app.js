var express = require('express'),
	http = require('http'),
	path = require('path'),
    User = require('./models/user'),
	io = require('socket.io').listen(1337);

function getRandomName() {
    return "User-" + Math.floor(Math.random() * 1000);
}

io.sockets.on('connection', function(socket) {
    var user = new User(getRandomName(), socket);
});

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(path.join(__dirname, '../frontend')));
});

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});

