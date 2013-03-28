//위키에 명령을 내리는 모듈
Application.modules = Application.modules || {};

Application.modules.commander = function(box){
	
	box.command = function( order ){

	};

	box.analyze = function( data, callback ){
		var order = null;
		//키 데이터를 분석해야한다.

		if( callback && typeof callback === 'function' ){
			callback.call(this, order);
		}
	};
};