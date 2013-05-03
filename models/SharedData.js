Application.models = Application.models || {};

Application.models.SharedData = function(){
	
	if( !localStorage.getItem('cmdList') ){
		localStorage.clear();
		localStorage.setItem('cmdList',['leftmenu', 'edit', 'preview', 'richtext', 'markup', 'save'].join('|'));	
	}

	var actionList = localStorage.getItem('cmdList').split('|');
	console.log(actionList);
	return function(){
		var that = this;
		$.each(actionList, function(index, name){
			that[name] = {
				cmdStr : null,
				keyCnt : -1,
				actions : {}/* 객체의 key값으로 데이터를 저장 */
			};
		});
	};
	
};