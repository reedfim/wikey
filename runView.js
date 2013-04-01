$(function(){

	//초기화
	Application(['keyListener','storage','viewer'], function(box){
		console.log('init', box);
		var models = Application.models,
			flag = models.flag,
			keyData;

		// 키 이벤트를 가져오기 위해 키 이벤트를 등록한다.
		box.listen().getKey(function( data ){
			keyData = data;
			console.log('viewer - 콜백으로 받아온 데이터 : ',keyData);
			
			//RUN_MODE가 REG이면 viewer가 데이터를 받는다.
			//viewer의 콜백 함수에서 확인을 누르면 register가 실행
			
		});
		var idx=1;
		$('#btn').on('click', function(e){
			console.log("aaa")
			chrome.runtime.sendMessage({data:{'on':'이벤트로 된것임'+idx++}}, function(response){
				$('#console').html(response.data);
			});			
		});

		//크롬익스텐션 코드를 적절히 섞어야 한다.
	});

});