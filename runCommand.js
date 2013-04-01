$(function(){
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			console.log(request.data, sender);
			//runView.js에서 단축키가 바로 바뀌면, 현재 탭을 새로고침 할 필요 없이, 최신 데이터를 바로 받아 model에 적용한다.
			Application.models.cmdList.set(request.data);
		}
	);
	//초기화
	//여기서 flag의 RUN_MODE를 변경할 수 있다.
	Application(['keyListener','storage','commander'], function(box){
		console.log('init', box);
		var models = Application.models,
			cmdList = models.cmdList,
			flag = models.flag,
			keyData;

		//로컬 스토리지에 있는 키 맵핑 데이터를 복원한다. - 최초 페이지 실행시 1회 - 그 외에는 이벤트를 통해 업데이트
		cmdList.set(box.restore());
		// 키 이벤트를 가져오기 위해 키 이벤트를 등록한다.
		box.listen().getKey(function( data ){
			keyData = data;
			console.log('콜백으로 받아온 데이터 : ',keyData);
			console.log(cmdList.get().on);
			//키 이벤트에 따라 commander가 실행된다.
			console.log('commander 객체의 함수 수행');
			
			box.isValid();
		});
		
		//크롬익스텐션 코드를 적절히 섞어야 한다.
	});

});

//각개 격파 해야한다.
//크롬익스텐션을 바로 사용해서(크롬의 기능을 활용해야 하기 때문에.)
//KeyListener와 viewer를 같이 사용하고, KeyListener와 commander를 같이 사용해야한다.