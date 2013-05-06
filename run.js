//초기화
console.log('init');	

var MODE = {
	current : 'CMD'
};

//최초 init시 실행할 모듈
O.notifyObserver('*.active', {
	type : MODE.current === MODE_TYPE.REG ? Observers.type.ACTIVE_REG : Observers.type.ACTIVE_CMD
});

//익스텐션 아이콘을 선택할때마다의 모드 체인지
chrome.runtime && chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		var start = request.data.start;
		console.log(typeof start);
		if(start && MODE.current === 'CMD'){ //커맨드모드였다면 뷰어로
			MODE.current = "REG";
		}else if(start && MODE.current === 'REG'){ //뷰어모드 였다면 커맨드로
			MODE.current = "CMD";
		}

		O.notifyObserver('*.active', {
			type : MODE.current === MODE_TYPE.REG ? Observers.type.ACTIVE_REG : Observers.type.ACTIVE_CMD
		});
	}
);



