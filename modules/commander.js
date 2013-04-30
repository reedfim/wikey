//위키에 명령을 내리는 모듈
Application.modules = Application.modules || {};

Application.modules.commander = function(base){
	var module = base != null ? $.extend(module, base) : {};

	var storage = localStorage;
		cmdData = null,
		runable = {}, // 각 기능마다 단축키가 매칭이 되면 true, 아닐경우 false
		eachCmdKeyCnt = {}; //각 기능마다 등록된 단축키의 수를 체크 - runable, eachCmdKeyCnt가 모두 맞아야 한다.


	module.init = function( data ){
		cmdData = data;

		//TEST
		cmdData['leftmenu'].keyCnt = 3;
		cmdData['leftmenu'].cmdStr = 'alt|shift|C';
		cmdData['leftmenu'].actions = {
			shift : true,
			alt : true,
			C : true
		}
		console.log(cmdData['leftmenu']);

		return this;
	};


	var prevKeyCode = {};
	//많은 고민이 필요할듯하다.. 이부분은,,
	module.command = function( keyData ){
		for(var key in cmdData){
			cmd = cmdData[key];
			runable[key] = runable[key] ? runable[key] && cmd.actions[keyData.keyName] : cmd.actions[keyData.keyName];
			
			if(!prevKeyCode[key]){
				eachCmdKeyCnt[key] = eachCmdKeyCnt[key] ? eachCmdKeyCnt[key] + 1 : 1;	
				prevKeyCode[key] = keyData.keyCode;
			}else if(prevKeyCode[key] && (prevKeyCode[key] !== keyData.keyCode)){
				eachCmdKeyCnt[key] = eachCmdKeyCnt[key] ? eachCmdKeyCnt[key] + 1 : 1;	
				prevKeyCode[key] = keyData.keyCode;
			}else if(prevKeyCode[key] && prevKeyCode === keyData.keyCode){
				prevKeyCode[key] = keyData.keyCode;
			}
			
			console.log(eachCmdKeyCnt);
			if(runable[key]){
				if(eachCmdKeyCnt[key] === cmd.keyCnt){
					console.log('action : '+key);	
					runable = {};
					eachCmdKeyCnt = {};		
				}else if(eachCmdKeyCnt[key] > cmd.keyCnt){
					eachCmdKeyCnt = {};				
				}
			}

		}
	};

	module.active = function(){

		return this;

	};
	module.deactive = function(){

		return this;
	};


	return module;
};