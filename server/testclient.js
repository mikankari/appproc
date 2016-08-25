(function() {
  window.addEventListener("load", function(event) {
    var socket;
    socket = io("ws://192.168.1.16:3000/");
    socket.on("connect", function() {
      console.log("connected to server");
      return console.log("id is " + socket.id);
    });
    socket.on("main", function(data) {
      return console.log("receive: " + (JSON.stringify(data)));
    });
    return document.querySelector("form").addEventListener("submit", function(event) {
      var text;
      text = document.querySelector("form input[type=text]").value;
      socket.emit("go", {});
      console.log("send");
      event.preventDefault();
      return event.stopPropagation();
    });
  }, false);

}).call(this);
