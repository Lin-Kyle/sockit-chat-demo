var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var path = require("path");

app.listen(80);

function handler(req, res) {
    var _path = req.url === '/'
        ? './user.html'
        : (path.join(__dirname, '../', req.url));

    fs.readFile(_path, function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function(socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function(data) {
        console.log(data);
    });
});
