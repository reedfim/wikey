Application.models = Application.models || {};

Application.models.Data = function(){

	var actionList = ['leftmenu', 'edit', 'preview', 'richtext', 'markup', 'save'];

	return function(){
		var that = this;
		$.each(actionList, function(index, name){
			that[name] = {
				cmdStr : null,
				keyCnt : 0,
				actions : {}/* 객체의 key값으로 데이터를 저장 */
			};
		});
	};
	
};