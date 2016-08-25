
function CharacterStatus(){
	this.here;
	this.desktop;
	this.ene;
	this.socket;
	this.timeout_timer;

	this.init();
}

CharacterStatus.prototype = {
	init: function (){
		this.here = "";
		this.desktop = "";
		this.ene = "";
		this.socket = null;
		this.timeout_timer = null;
	}
	, receive: function (callback){
		this.socket = io("ws://" + location.hostname + ":3000/");
		this.socket.on("connect2", function (data){
			if(data.here != "" && data.here.indexOf(character_status.socket.id) == -1){
				return;
			}
			window.clearTimeout(character_status.timeout_timer);
			character_status.here = data.here;
			character_status.desktop = data.desktop;
			character_status.ene = data.ene;
			callback();
		});
		this.socket.on("go", function (data){
			character_status.desktop = data.desktop;
			character_status.ene = data.ene;
			callback();
		});
		window.addEventListener("beforeunload", function (){
			if(character_status.here == character_status.ene){
				character_status.sendOther();
			}
		}, false);
		this.timeout_timer = window.setTimeout(function () {
			character_status.localmode();
			callback();
		}, 5000);
	}
	, localmode: function (){
		this.here = "";
		this.desktop = "";
		this.ene = "";
	}
	, isDesktop: function (){
		location.hostname != "127.0.0.1"
	}

	, sendDesktop: function (){
		this.socket.emit("goback", {});
	}

	, sendOther: function (){
		this.socket.emit("go", {});
	}
}
