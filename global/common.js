var MODE_TYPE = {
	REG : 'REG',
	CMD : 'CMD'
};

//입력된 키의 코드와 그 키의 의미를 가지고 있는 객체
var keyNamePair = (function(){
	var nameValuePair = {},
		i, fromChar = String.fromCharCode;

	code = {
		START_CHAR_CODE : 65, //A
		END_CHAR_CODE : 90, //Z
		START_NUM_CODE : 48, //0
		END_NUM_CODE : 57, //9
	};

	nameValuePair['16'] = 'shift';
	nameValuePair['17'] = 'ctrl';
	nameValuePair['18'] = 'alt';
	nameValuePair['91'] = 'meta';

	for (i = code.START_CHAR_CODE; i <= code.END_CHAR_CODE; i++) {
		nameValuePair[i] = fromChar(i);
	}
	for (i = code.START_NUM_CODE; i <= code.END_NUM_CODE; i++) {
		nameValuePair[i] = fromChar(i);	
	}
	
	return nameValuePair;
})();


//로컬스토리지에 있는 커맨드 데이터를 조작한다.
var storageData = (function(){
	
	if( !localStorage.getItem('cmdList') ){
		localStorage.clear();
		localStorage.setItem('cmdList',['sidebar', 'edit', 'preview', 'richtext', 'markup', 'save'].join('|'));	
	}
	
	var list = localStorage.getItem('cmdList').split('|'),
		datas = {};

	function getCmdList(){
		return list;
	}
	function get(name){

		return datas[name];
	}
	function set(name, valueObject){ //
		//로컬스토리지에 저장을 한다.
		//datas 객체를 변화 시킨다.
		datas[name] = valueObject;
		console.log(name, JSON.stringify(valueObject), valueObject);
		localStorage.setItem(name, JSON.stringify(valueObject));

		return get(name);
	}


	//Initialized
	function _init(){
		$.each(list, function(index, name){
			var d = localStorage.getItem(name);
			
			if(d){
				d = JSON.parse(d);
				datas[name] = {
					cmdStr : d.cmdStr,
					keyCnt : d.keyCnt,
					actions : d.actions
				};

			}else{
				datas[name] = {
					cmdStr : '',
					keyCnt : -1,
					actions : {}/* 객체의 key값으로 데이터를 저장 */
				};
			}
		});

		return {
			get : get,
			set : set,
			getCmdList : getCmdList
		};
	}

	return {
		init : _init
	};

})().init();