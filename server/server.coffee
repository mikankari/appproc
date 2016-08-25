IO = require "socket.io"

io = new IO()

desktop = null
ene = null

host = "127.0.0.1"
port = 3000

broadcastStatusFor = (type, here = 0) ->
	data = {
		"here": here
		"ene": ene
		"desktop": desktop
	}
	
	io.emit type, data
	
	console.log "#{host} (#{type})\n#{JSON.stringify data}\n"

io.on "connection", (socket) ->
	if (socket.request.connection.remoteAddress.indexOf host) isnt -1
		desktop = socket.id
		ene = desktop
	
	broadcastStatusFor "connect2", socket.id
	
	socket.on "go", (data) ->
		console.log "#{socket.id} (go)\n#{JSON.stringify data}\n"
		
		io.of "/"
			.clients (error, clients) ->
				return if clients.length < 2
				
				oldene = ene
				ene = clients[Math.floor Math.random() * clients.length] until ene isnt oldene
				
				broadcastStatusFor "go"
	
	socket.on "goback", (data) ->
		console.log "#{socket.id} (goback)\n#{JSON.stringify data}\n"
		
		ene = desktop
		
		broadcastStatusFor "go"

io.listen port

console.log "listening on #{port}"
