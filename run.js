//초기화
Application(['keyListener','commander','assignor', 'SharedData'], function(keyListener, commander, assignor, SharedData){
	
	var CURRENT_MODE = 'ASSIGN';//'ASSIGN';
	console.log('init', this, new SharedData());	



	var keyData,
		sharedCmdData = new SharedData();

	if(CURRENT_MODE === 'ASSIGN'){
		assignor.init(sharedCmdData).active();
		commander.init(sharedCmdData);	
	}else{
		assignor.init(sharedCmdData);
		commander.init(sharedCmdData).active();
	}
	

	// 키 이벤트를 가져오기 위해 키 이벤트를 등록한다.
	keyListener.listen().setHandler( keyDownHandler );


	function keyDownHandler( data ){
		keyData = data.keys;
		console.log('콜백으로 받아온 데이터 : ',keyData);
		
		if(CURRENT_MODE === 'ASSIGN'){
			console.log('키 할당 모드');
			assignor.setDataOnView(keyData);
		
		}else if(CURRENT_MODE === 'COMMAND'){
			console.log('commander 객체의 함수 수행');
			commander.command(keyData);	
		}
	}
	function keyUpHandler( data ){
		console.log('key up data : ', data.keys);
	}




	
	//익스텐션 아이콘을 선택할때마다의 모드 체인지
	chrome.runtime && chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			var start = request.data.start;
			console.log(typeof start);
			if(start && CURRENT_MODE === 'COMMAND'){ //커맨드모드였다면 뷰어로
				CURRENT_MODE = "ASSIGN";
				assignor.active();
				commander.deactive();
			}else if(start && CURRENT_MODE === 'ASSIGN'){ //뷰어모드 였다면 커맨드로
				CURRENT_MODE = "COMMAND";
				assignor.deactive();
				commander.active();
			}
		}
	);


});
