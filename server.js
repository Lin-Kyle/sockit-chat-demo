var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler(req, res) {
    fs.readFile(__dirname + (
        req.url === '/'
        ? '/user_state3.html'
        : req.url), function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function(socket) {
    socket.on('user_send', function(data) {
        console.log('user_send: ' + data.content);
        socket.emit('user_receive', {content: 'I got it!'})
    });
});
