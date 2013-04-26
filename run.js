//초기화
Application(['keyListener','storage','commander','viewer'], function(box){
	console.log('init', box);
	var models = Application.models,
		cmdList = models.cmdList,
		flag = models.flag,
		keyNamePair = models.keyNamePair,
		keyData;


	flag.CURRENT_MODE = flag.DEFAULT_MODE;
	box.viewInit(); //뷰를 초기화 하고 감춘다.
	//로컬 스토리지에 있는 키 맵핑 데이터를 복원한다. - 최초 페이지 실행시 1회 - 그 외에는 이벤트를 통해 업데이트
	cmdList.set(box.restore());
	// 키 이벤트를 가져오기 위해 키 이벤트를 등록한다.
	box.listen().getKey(function( data ){
		keyData = data;
		console.log('콜백으로 받아온 데이터 : ',keyData);
		
		if(flag.CURRENT_MODE === 'VIEW'){
			console.log('view다.');
			box.setDataOnView(keyData.keyName);
		
		}else if(flag.CURRENT_MODE === 'COMMAND'){
			box.isValid();	
			console.log('commander 객체의 함수 수행');
		}
		
	});
	
	//익스텐션 아이콘을 선택할때마다의 모드 체인지
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			var start = request.data.start;
			console.log(typeof start);
			if(start && flag.CURRENT_MODE === 'COMMAND'){ //커맨드모드였다면 뷰어로
				flag.CURRENT_MODE = "VIEW";
				box.showView();
			}else if(start && flag.CURRENT_MODE === 'VIEW'){ //뷰어모드 였다면 커맨드로
				flag.CURRENT_MODE = "COMMAND";
				box.closeView();
			}
		}
	);
});


//각개 격파 해야한다.
//크롬익스텐션을 바로 사용해서(크롬의 기능을 활용해야 하기 때문에.)
//KeyListener와 viewer를 같이 사용하고, KeyListener와 commander를 같이 사용해야한다.