//초기화
console.log('wikey init');	

//모듈 초기화
keyListener.listen();
commander.init();
register.init();
indicator.init();

//옵저버 추가
O.addObserver('register').add(register.updateKeyData).add(register.active).add(register.deactive);
O.addObserver('commander').add(commander.updateKeyData).add(commander.active).add(commander.deactive);
O.addObserver('indicator').add(indicator.show);


var CURRENT_MODE = MODE_TYPE.CMD;


//최초 init시 실행할 모듈
O.notifyObserver('*.active', {
	type : CURRENT_MODE === MODE_TYPE.REG ? Observers.type.ACTIVE_REG : Observers.type.ACTIVE_CMD
});

//익스텐션 아이콘을 선택할때마다의 모드 체인지
chrome.runtime && chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		var start = request.data.start;
		
		if(start && CURRENT_MODE === 'CMD'){ //커맨드모드였다면 뷰어로
			CURRENT_MODE = "REG";
		}else if(start && CURRENT_MODE=== 'REG'){ //뷰어모드 였다면 커맨드로
			CURRENT_MODE = "CMD";
		}

		O.notifyObserver('*.active', {
			type : CURRENT_MODE === MODE_TYPE.REG ? Observers.type.ACTIVE_REG : Observers.type.ACTIVE_CMD
		});
	}
);



