const app = require('http').createServer(handler),
  io = require('socket.io')(app),
  fs = require('fs'),
  path = require("path");

app.listen(80);

function handler(req, res) {
  const _path = req.url === '/'
    ? './user.html'
    : (path.join(__dirname, '../', req.url))

  fs.readFile(_path, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

const user_list = [];
io.on('connection', (socket) => {
  if (!user_list.includes(socket))  user_list.push(socket);
  socket.on('user_send', (data) => {
    user_list.map(item => {
      if (item !== socket)
        item.emit('user_receive', {content: data.content})
    })
  });
});
