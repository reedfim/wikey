
$(function(){

	//초기화
	//여기서 flag의 RUN_MODE를 변경할 수 있다.
	Application(['keyCatcher','viewer','register','commander'], function(app){
		console.log('init', app);
		var models = Application.models,
			flag = models.flag,
			data;
		
		// 키 이벤트를 가져오기 위해 키 이벤트를 등록한다.
		app.bindKeyEvent().regEventCallback(function(res){
			data = res;
			console.log('콜백으로 받아온 데이터 : ',data);
			
			//RUN_MODE가 EXE이면 키 이벤트에 따라 commander가 실행된다.
			if(flag.RUN_MODE === 'EXE') {
				console.log('commander 객체의 함수 수행');
			}
		});

		//viewer의 콜백 함수에서 확인을 누르면 register가 실행
		//viewer를 만들고 콜백함수를 등록해야한당.
		if(flag.RUN_MODE === 'REG') {
			console.log('register');
		}
		
	});
});