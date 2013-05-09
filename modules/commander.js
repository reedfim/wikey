//위키에 명령을 내리는 모듈
var commander = (function(){
	
	var storage = localStorage;
		cmdData = null,
		runable = {}, // 각 기능마다 단축키가 매칭이 되면 true, 아닐경우 false
		eachCmdKeyCnt = {}; //각 기능마다 등록된 단축키의 수를 체크 - runable, eachCmdKeyCnt가 모두 맞아야 한다.

	
	var ckey, rkey, isAction, count;
	function updateKeyData( obsData ){
		if(obsData.type === O.type.KEY_IN_CMD)
		for( ckey in cmdData ){
			cmd = cmdData[ckey];
			if(obsData.keys && $.type(obsData.keys) === 'object'){
				isAction = true;
				count = 0;
				for( rkey in cmd.actions ){
					isAction = isAction && obsData.keys[rkey];
					count++;
				}
				if(isAction && count === cmd.keyCnt){ //cmd.actions라는 데이터가 없을때는 무조건 명령이 실행되는 버그가 있다. 수정하자.
					console.log(ckey +' 명령실행');
					if(wikiActions[ckey].enabled()){
						O.notifyObserver('indicator',{
							type : O.type.SHOW_INDICATOR,
							title : wikiActions[ckey].title
						});

						wikiActions[ckey].trigger(); //해당 단축키에 대한 액션 실행
					}				

				}else{
					console.log(ckey +' 단축키 아님');
				}
			}
		}
	};

	function active( obsData ){
		if(obsData.type === O.type.ACTIVE_CMD){
			O.notifyObserver('register.deactive', {
				type : O.type.DEACTIVE_REG
			});

			//엑티베이션 코드
			cmdData = {};
			$.each(wikiActions.getList(), function(i, name){
				cmdData[name] = storageData.get(name);
			});
		}
	};
	function deactive( obsData ){
		if(obsData.type === O.type.DEACTIVE_CMD){ //현재 모드가 REG이기 때문에 deactive 시킨다.

			//디엑티베이션 코드
		}
	};


	//Initialized
	function _init(  ){
		cmdData = {};
		$.each(wikiActions.getList(), function(i, name){
			cmdData[name] = storageData.get(name);
		});
		console.log(cmdData);		

		//옵저버 추가
		O.addObserver('commander').add(updateKeyData).add(active).add(deactive);
	};

	return {
		init : _init
	}

})();








