//위키에 명령을 내리는 모듈
(function(){
	
	var storage = localStorage;
		cmdData = null,
		cmdToAction = {},
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
					cmdToAction[ckey].trigger();
					O.notifyObserver('indicator',{
						type : O.type.SHOW_INDICATOR,
						title : ckey
					});

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
			$.each(storageData.getCmdList(), function(i, name){
				cmdData[name] = storageData.get(name);
			});
		}
	};
	function deactive( obsData ){
		if(obsData.type === O.type.DEACTIVE_CMD){ //현재 모드가 REG이기 때문에 deactive 시킨다.

			//디엑티베이션 코드
		}
	};

	//옵저버 추가
	O.addObserver('commander').add(updateKeyData).add(active).add(deactive);


	//Initialized
	function _init(  ){
		cmdData = {};
		var list = storageData.getCmdList();
		$.each(list, function(i, name){
			cmdData[name] = storageData.get(name);
		});

		console.log(cmdData);

		// 실제 수행해야 하는 작업을 모아놓은 객체	
		$.each(list, function(i, name){
			var func = null;
			switch(name){
				case 'sidebar' :
					console.log('sidebar');
					func = function(){
						$('#splitter-button').trigger('click');
					}
				break;
				case 'edit' :
					console.log('edit');
					func = function(){
						location.href = $('#editPageLink').attr('href');		
					}	
				break;
				case 'preview' :
					func = function(){
						console.log('preview');
						$('#previewTab a').trigger('click');
					}
				break;
				case 'richtext' :
					func = function(){
						console.log('richtext');
						$('#wysiwygTab a').trigger('click');
					}
				break;
				case 'markup' :
					func = function(){
						console.log('markup');
						$('#markupTab a').trigger('click');
					}
				break;
				case 'save' :
					console.log('save');
					func = function(){
						$('#editpageform').submit();
					}					
				break;
			}

			cmdToAction[name] = {
				trigger : func
			};			
			
		})
		console.log(cmdToAction);
	};

	return {
		init : _init
	}

})().init();








