//viewer에서 데이터를 빼와 저장한다.
//필요있을지 없을지 아직 모르겠다.
Application.modules = Application.modules || {};

Application.modules.storage = function(box){
	var _storage = localStorage;

	box.backup = function( data ){

	};
	box.restore = function(){
		return {on : '최초 로딩된것임'};
	};

};