/**
* Observer.js
* 각 객체들의 상태가 변경되면 등록된 감사자들에게 전파한다.
*/


var Observers = (function(){
	var _obs_ = {},
		_ref_obs_ = {};

	return {
		addObserver : function Observer(obId, refIdSelf){ //obId, refIdSelf-id값의 this
			if(!obId || $.type(obId) !== 'string') return;
			var eachObserver = _obs_[obId] = ( _obs_[obId] ? _obs_[obId] : {} );
			refIdSelf && ( _ref_obs_[obId] = refIdSelf );

			return {
				add : function(func){
					if(func && $.type(func) === 'function'){
						eachObserver[func.name || new Date().getTime()] = func;
					}
					console.log(eachObserver);

					return this;			
				},
				remove : function(func){
					if(func && $.type(func) === 'string'){ //함수 이름으로 넘어올때
						var funcRef = eachObserver[func];
						if(funcRef){
							delete eachObserver[func];
						}

					}else if(func && $.type(func) === 'function'){
						var name = func.name;
						if(name){
							delete eachObserver[name];
						}
					}
					return this;
				}
			} 
		}, //addObserver
		notifyObserver : function(obId, data){ //obId는 선택, data는 필수
			if( (obId && $.type(obId) === 'string') && (data && typeof data === 'object') ){				
				var chkIds = obId.split('.');
				if(chkIds[0] === '*'){ // *.funcname
					for(var o in _obs_){
						if(chkIds[1]){
							_obs_[o][chkIds[1]] && _obs_[o][chkIds[1]].call(_ref_obs_[o], data);
						}
					}
				}else{
					var eachObserver = _obs_[chkIds[0]];
				
					if(eachObserver && chkIds[1]){
						eachObserver[chkIds[1]] && eachObserver[chkIds[1]].call(_ref_obs_[chkIds[0]], data);
					}else{
						$.each(eachObserver, function(i, func){
							func.call(_ref_obs_[chkIds[0]], data);
						});
					}	
				}			
			
			}else if(obId && $.type(obId) === 'object' && !data){ //golbal
				var tempData = obId;
				for(var o in _obs_){
					$.each(_obs_[o], function(i, func){
						func.call(_ref_obs_[o], tempData);
					});
				}
			}
		},
		removeObserver : function(obId){
			if( obId && $.type(obId) === 'string'){
				delete _obs_[obId];
				delete _ref_obs_[obId];
			}
		}, //removeObserver
		getObserverList : function(){
			var list = [];
			$.each(_obs_, function(id){
				list.push(id);
			});

			return list;
		}

	}; //Observer Singlton Object return;
})();

var O = Observers;

Observers.type = {
	'KEY_IN_REG' : 1,
	'ACTIVE_REG' : 11,
	'DEACTIVE_REG' : 111,
	
	'KEY_IN_CMD' : 2,
	'ACTIVE_CMD' : 22,
	'DEACTIVE_CMD' : 222,

	'SHOW_INDICATOR' : 9
};


