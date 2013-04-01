Application.models = Application.models || {};

Application.models.cmdList = (function(){

	var _data = null;

	return {
		set : function( data ) {
			_data = data;
		},
		get : function() {
			if(_data){
				return $.extend(true, {}, _data);	
			} else {
				return null;
			}			
		}
	}
})();