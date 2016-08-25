(function() {
  var IO, broadcastStatusFor, desktop, ene, host, io, port;

  IO = require("socket.io");

  io = new IO();

  desktop = null;

  ene = null;

  host = "127.0.0.1";

  port = 3000;

  broadcastStatusFor = function(type, here) {
    var data;
    if (here == null) {
      here = 0;
    }
    data = {
      "here": here,
      "ene": ene,
      "desktop": desktop
    };
    io.emit(type, data);
    return console.log("" + host + " (" + type + ")\n" + (JSON.stringify(data)) + "\n");
  };

  io.on("connection", function(socket) {
    if ((socket.request.connection.remoteAddress.indexOf(host)) !== -1) {
      desktop = socket.id;
      ene = desktop;
    }
    broadcastStatusFor("connect2", socket.id);
    socket.on("go", function(data) {
      console.log("" + socket.id + " (go)\n" + (JSON.stringify(data)) + "\n");
      return io.of("/").clients(function(error, clients) {
        var oldene;
        if (clients.length < 2) {
          return;
        }
        oldene = ene;
        while (ene === oldene) {
          ene = clients[Math.floor(Math.random() * clients.length)];
        }
        return broadcastStatusFor("go");
      });
    });
    return socket.on("goback", function(data) {
      console.log("" + socket.id + " (goback)\n" + (JSON.stringify(data)) + "\n");
      ene = desktop;
      return broadcastStatusFor("go");
    });
  });

  io.listen(port);

  console.log("listening on " + port);

}).call(this);
