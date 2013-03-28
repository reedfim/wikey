
$(function(){

	//초기화
	//여기서 flag의 RUN_MODE를 변경할 수 있다.
	Application(['keyListener','storage','viewer','commander'], function(box){
		console.log('init', box);
		var models = Application.models,
			flag = models.flag,
			keyData;

		// 키 이벤트를 가져오기 위해 키 이벤트를 등록한다.
		box.listen().getKey(function( data ){
			keyData = data;
			console.log('콜백으로 받아온 데이터 : ',keyData);
			if(flag.RUN_MODE === 'REG') {
				//RUN_MODE가 REG이면 viewer가 데이터를 받는다.
				//viewer의 콜백 함수에서 확인을 누르면 register가 실행
				console.log('viewer 객체의 함수 수행');
			}
			
			if(flag.RUN_MODE === 'EXE') {
				//RUN_MODE가 EXE이면 키 이벤트에 따라 commander가 실행된다.
				console.log('commander 객체의 함수 수행');
				
				box.analyze(keyData, function(order){
					
					box.command(order);
				});
				
			}
		});
		
		//크롬익스텐션 코드를 적절히 섞어야 한다.
	});

});

//각개 격파 해야한다.
//크롬익스텐션을 바로 사용해서(크롬의 기능을 활용해야 하기 때문에.)
//KeyListener와 viewer를 같이 사용하고, KeyListener와 commander를 같이 사용해야한다.