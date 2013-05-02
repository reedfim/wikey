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
	module.command = function( pressedKeys ){
		for(var ckey in cmdData){
			cmd = cmdData[ckey];
			if(pressedKeys && $.type(pressedKeys) === 'array'){
				var isAction = true;
				for( rkey in cmd.actions ){
					isAction = isAction && pressedKeys[rkey];
				}
				if(isAction){ //cmd.actions라는 데이터가 없을때는 무조건 명령이 실행되는 버그가 있다. 수정하자.
					console.log(ckey +' 명령실행');
				}else{
					console.log(ckey +' 단축키 아님');
					isAction = true;
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