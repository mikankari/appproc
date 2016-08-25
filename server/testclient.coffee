window.addEventListener "load", (event) ->
	
	socket = io "ws://192.168.1.16:3000/"
	
	socket.on "connect", ->
		console.log "connected to server"
		console.log "id is #{socket.id}"
	
	socket.on "main", (data) ->
		console.log "receive: #{JSON.stringify data}"
	
	document.querySelector "form"
		.addEventListener "submit", (event) ->
			
			text = document.querySelector "form input[type=text]"
				.value
			
			socket.emit "go", {}
			
			console.log "send"
			
			event.preventDefault()
			event.stopPropagation()
	
, false