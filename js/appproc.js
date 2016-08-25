
var character_data;
var character_status;
var fase;
var initalized;

function init(){
	var finish_button = document.getElementById("finish_button");
	finish_button.addEventListener("click", function(){
		if(character_status.here == character_status.desktop){
			if(window.confirm("戦闘を終了しますか？")){
				fase = -2;
				next();
			}
		}else{
			window.alert("避難所モードでは戦闘を終了できません。攻撃場所で操作します");
		}
	}, false);
	var credit_button = document.getElementById("credit_button");
	credit_button.addEventListener("click", function (){
		var message = "";
		message += "KMB Ver.1.0 produce by 遠藤\n";
		message += "\n";
		message += "イラストを提供して下さった吉野さん\n";
//		message += "キャラクター転送PHPプログラムを参考にさせていただいたsaaraan.com様\n";
		message += "に多大なる感謝を。\n";
		message += "And Thank you your playing.";
		window.alert(message);
	}, false);

	character_data = new Character();
	character_status = new CharacterStatus();
	character_status.receive(function (){
		console.log(fase);
		console.log(character_status);
		var character_text;
		var character_image;
		if(character_status.ene == character_status.here){
			if(character_status.here == character_status.desktop){
				character_text = "攻撃体制に戻ってみたよ！";
				character_image = "images/yandereko_defort.png";
			}else{
				character_text = "ここにいれば安全かも";
				character_image = "images/yandereko_defort.png";
			}
		}else{
			if(character_status.here == character_status.desktop){
				character_text = "逃げてやるんだからー";
				character_image = "images/outing.png";
			}else{
				character_text = "攻撃に出かけています";
				character_image = "images/outing.png";
			}
		}
		if(fase != 1 || (character_status.here != character_status.desktop)){
			window.setTimeout('setCharacterText("ケーブル内を移動中..."); setCharacterImage("images/outing.png");', 0);
			window.setTimeout('setCharacterText("' + character_text + '"); setCharacterImage("' + character_image + '");', 1500);
		}else{
			setCharacterImage(character_image);
		}
		if(!initalized){
			initalized = true;
			next();
		}
	});
	fase = 0;
	initalized = false;
	next();
		//character_status.localmode();
		//fase = 1;
		//next();
		// setCharacterText("もっと新しいブラウザがいいな");
		// setCharacterImage("images/yandereko_defort.png");

}

function next(option){
	var console_html = '';
	var character_text;
	var character_image;
	if(fase < 4){
		switch(fase){
			case -2:
				console_html += '<button onclick="next(\'left\')">左プレイヤーの勝利</button>　<button onclick="next(\'right\')">右プレイヤーの勝利</button>';
				character_text = "どっちが勝ちましたか？";
				character_image = "images/yandereko_defort.png";
				if(character_status.ene != character_status.here){
					character_status.sendDesktop();
				}
				break;
			case -1:
				if(character_data.position == option){
					console_html += '<div class="result">勝利</div>';
					character_text = "やった！";
					character_image = "images/yandereko_win.png";
				}else{
					console_html += '<div class="result">敗北</div>';
					character_text = "いたた…あいつに負けるなんて…";
					character_image = "images/yandereko_lose.png";
				}
				console_html += '<button onclick="next(\'\')">OK</button>';
				fase++;
				break;
			case 0:
				character_text = "ケーブル確認中...";
				character_image = "images/outing.png";
				console_html += '';
				initalized = false;
				break;
			case 1:
				if(character_status.here == character_status.desktop){
					console_html += '<button onclick="next(\'left\')">左プレイヤー</button>　<button onclick="next(\'right\')">右プレイヤー</button>';
					character_text = "プレイヤーモードを選択してください！";
					character_image = "images/yandereko_defort.png";
				}else{
					console_html += '避難所モード';
					character_text = "防御時はこちらで戦います";
					character_image = "images/outing.png";
				}
				break;
			case 2:
				character_data.position = option;
				console_html += '<table>';
				console_html += '<tr><td>体力</td><td><span class="output">' + character_data.hp + '</span></td></tr>';
				console_html += '<tr><td>素早さ</td><td><span class="output">' + character_data.speed + '</span></td></tr>';
				console_html += '<tr><td>貯めMAX</td><td><span class="output">' + character_data.pool_max + '</span></td></tr>';
				console_html += '<tr><td>運</td><td><span class="output">' + character_data.luck + '</span></td></tr>';
				console_html += '</table>';
				console_html += '<button onclick="next(\'\')">OK</button>';
				character_text = "わたしの初期パラメータです。ジャッジのシステムに入力するのです";
				character_image = "images/yandereko_defort.png";
				break;
			case 3:
				console_html += '<table>';
				console_html += '<tr><td>体力</td><td><input type="number" min="0" max="45" value="' + character_data.hp + '"></td></tr>';
				console_html += '<tr><td>素早さ</td><td><input type="number" min="0" max="45" value="' + character_data.speed + '"></td></tr>';
				console_html += '<tr><td>貯めMAX</td><td><input type="number" min="0" max="45" value="' + character_data.pool_max + '"></td></tr>';
				console_html += '<tr><td>貯め</td><td><input type="number" disabled value="' + character_data.pool + '"></td></tr>';
				console_html += '<tr><td>運</td><td><input type="number" min="0" max="45" value="' + character_data.luck + '"></td></tr>';
				console_html += '<tr><td>' + (character_data.position == "left" ? "右" : "左") + 'プレイヤーの体力</td><td><input type="number" min="0" max="45" value="' + character_data.enemy_hp + '"></td></tr>';
				console_html += '</table>';
				console_html += '<button onclick="next(\'\')">OK</button>';
				character_text = "入力できましたね、つづいて創造効果です。相手の体力も忘れずにね";
				character_image = "images/yandereko_defort.png";
				break;
		}
	}else{
		switch((fase - 4) % 2){
			case 0:
				if(fase == 4){
					var inputs = document.getElementsByTagName("input");
					var hp = parseInt(inputs.item(0).value);
					var speed = parseInt(inputs.item(1).value);
					var pool_max = parseInt(inputs.item(2).value);
					var luck = parseInt(inputs.item(4).value);
					var enemy_hp = parseInt(inputs.item(5).value);
					character_data.initParameter(hp, speed, pool_max, luck, enemy_hp);
				}else{
					var inputs = document.getElementsByTagName("input");
					var left_hp = parseInt(inputs.item(0).value);
					var right_hp = parseInt(inputs.item(1).value);
					character_data.inputHp(left_hp, right_hp);
				}
				character_data.initTurnParameter();
				if(fase == 4){
					character_text = "いよいよ攻撃開始ですよ！ジャッジのシステムに入力するのです";
					character_image = "images/yandereko_defort2.png";
				}else{
					if(character_data.attack > character_data.defense){
						if(character_data.attack == 7){
							character_text = '大事なもの、もっていこうかな…';
							character_image = "images/yandereko_Amax.png";
						}else{
							character_text = "いっくよー";
							character_image = "images/yandereko_defort2.png";
						}
						if(character_status.ene != character_status.here){
							character_status.sendDesktop();
						}
					}else{
						if(character_data.defense == 7){
							character_text = "あいつなんか…あいつなんか…あいつなんか…";
							character_image = "images/yandereko_Amax.png";
						}else{
							character_text = "いまは手加減してやるんだから！";
							character_image = "images/yandereko_defort2.png";
						}
						if(character_status.ene == character_status.here){
							character_status.sendOther();
						}
					}
				}
				console_html += '<table>';
				console_html += '<tr><td>攻撃</td><td><span class="output">' + character_data.attack + '</span></td></tr>'
				console_html += '<tr><td>防御</td><td><span class="output">' + character_data.defense + '</span></td></tr>'
				console_html += '<tr><td>貯め</td><td><span class="output">' + character_data.pool + '</span></td></tr>'
				console_html += '</table>';
				console_html += '<button onclick="next(\'\')">OK</button>'
				break;
			case 1:
				console_html += '<table>';
				console_html += '<tr><td>左プレイヤーの体力</td><td><input type="number" min="0" max="40" value="' + (character_data.position == "left" ? character_data.hp : character_data.enemy_hp) + '"></td></tr>';
				console_html += '<tr><td>右プレイヤーの体力</td><td><input type="number" min="0" max="40" value="' + (character_data.position == "left" ? character_data.enemy_hp : character_data.hp) + '"></td></tr>';
				console_html += '</table>';
				console_html += '<button onclick="next(\'\')">OK</button>'
				character_text = "痛いです";
				character_image = "images/yandereko_damage.png";
				break;
		}
	}
	setConsoleText(console_html);
	setCharacterText(character_text);
	setCharacterImage(character_image)
	fase++;
}

function setConsoleText(html){
	var console_text = document.getElementById("console_text");
	console_text.innerHTML = html;
}

function setCharacterImage(file){
	if(character_status.ene != character_status.here){
		file = "images/outing.png";
	}
	var character_image = document.getElementById("character_image");
	character_image.src = file;
}

function setCharacterText(text){
	text = text.replace(/\n/, '<br>');
	var character_text = document.getElementById("character_text");
	character_text.innerHTML = text;
}

window.addEventListener("load", init, false);
