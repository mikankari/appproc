

function Character(){
	this.hp;
	this.speed;
	this.pool_max;
	this.luck;
	this.enemy_hp;
	this.position;
	this.attack;
	this.defense;
	this.pool;

	this.init();
}

Character.prototype = {
	init: function (){
		// 初期パラメータ指定
		var hp = 25;
		var speed = 0;
		var pool_max = 0;
		var luck = 15;
		var enemy_hp = 30;
		if(hp + speed + pool_max + luck > 40 || enemy_hp > 40){
			throw new Error("初期パラメータは40を超えています");
		}
		this.initParameter(hp, speed, pool_max, luck, enemy_hp);
		this.pool = 0;
	}

	, initParameter: function (hp, speed, pool_max, luck, enemy_hp){
		this.hp = hp;
		this.speed = speed;
		this.pool_max = pool_max;
		this.luck = luck;
		this.enemy_hp = enemy_hp;
	}

	, initTurnParameter: function (){
		var attack;
		var defense;
		var bonus = Math.floor(Math.random() * 3);
		if(bonus >= 3){ // この可能性あるかな
			bonus = 2;
		}
		if(this.hp >= this.enemy_hp){
			var attack = 5 * (this.luck > Math.floor(Math.random() * 20) ? 1 : 0) + bonus;
			var defense = 7 - attack;
		}else{
			var defense = 5 * (this.luck > Math.floor(Math.random() * 20) ? 1 : 0) + bonus;
			var attack = 7 - defense;
		}
		var pool = 0;
		if(attack + defense + pool > 7 + this.pool){
			throw new Error("ターンパラメータは7を超えています");
		}
		this.attack = attack;
		this.defense = defense;
		this.pool = pool;
	}

	, inputHp: function (left_hp, right_hp){
		if(this.position == "left"){
			this.hp = left_hp;
			this.enemy_hp = right_hp;
		}else{
			this.hp = right_hp;
			this.enemy_hp = left_hp;
		}
	}
}
