
function CharacterStatus(){
	this.client;
	this.ene;
	this.clients;
	this.socket;
	this.timerout_timer;

	this.init();
}

CharacterStatus.prototype = {
	init: function (){
		this.client = "";
		this.default_client = "192.168.1.42";
		this.ene = "";
		this.clients = [];
		this.socket = null;
	}
	, isSupported: function (){
		return window.WebSocket ? true : false;
	}
	, receive: function (callback){
		this.socket = new WebSocket("ws://" + location.hostname + ":3939/appproc/server/server.php");
		this.socket.addEventListener("message", function (event){
			if(event.data.match(/^(login|logout|message) client\:([\d\.]*) ene\:([\d\.]*) clients\:([\d\.\;]*)$/)){
				var command = RegExp.$1;
				var client = RegExp.$2;
				var ene = RegExp.$3;
				var clients = RegExp.$4;
				if(client != "" && character_status.client == ""){
					character_status.client = client;
				}
				if(ene != "" && ene != character_status.ene){
					character_status.ene = ene;
					callback();
				}
				if(clients != ""){
					character_status.clients = clients.split(";");
				}
			}
			window.clearTimeout(character_status.timerout_timer);
		}, false);
		this.socket.addEventListener("error", function (event){
			if(character_status.client == ""){
				character_status.setLocal();
				callback();
			}
			window.clearTimeout(character_status.timerout_timer);
		}, false);
		window.addEventListener("unload", function (event){
			if(character_status.client == character_status.ene){
				character_status.send();
			}
		}, false);
		this.timerout_timer = window.setTimeout(function () {	character_status.setLocal();	callback();	}, 5000);
	}
	, setLocal: function (){
		this.client = this.default_client;
		this.ene = this.default_client;
		this.clients = this.default_client;
	}

	, sendClient: function (){
		var to = this.client;
		return this.send(to);
	}

	, sendOther: function (){
		if(this.clients.length < 2){
			return false;
		}
		var to;
		do{
			to = this.clients[Math.floor(Math.random() * this.clients.length)];
		}while(to == this.ene);
		return this.send(to);
	}

	, send: function (to){
		var result;
		try{
			this.socket.send("message client:" + this.client + " ene:" + to + " clients:");
			result = true;
		}catch(error){
			result = false;
		}
		return result;
	}
}
