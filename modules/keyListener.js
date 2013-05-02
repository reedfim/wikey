
Application.modules = Application.modules || {};

Application.modules.keyListener = function(base){
	var module = base != null ? $.extend(module, base) : {};

	var _win = window,
		_duplKeyCode = -1, //일반적인 키는 중복으로 눌리기 때문에 한번만 켓치할 수 있도록 확인하는 변수
		_duplFuncCode = -1,
		_fromCh = String.fromCharCode,
		_downHandler = null,
		_upHandler = null,
		_keyNamePair = Application.prototype.keyNamePair,
		_pressedKeys = [];
		

	module.listen = function(){
		console.log('bind keydown event');
		//등록된 Key Event handler를 없애고, 재 등록한다.
		$(_win).on('keydown', function(e){
			
			var keyCode = e.keyCode || e.which;
			
			if ((keyCode >= 65 && keyCode <= 90) || (keyCode >=48 && keyCode <=57)){ //A-Z || 0-9
				if(_duplKeyCode !== keyCode) {
					_duplKeyCode = keyCode;

					_pressedKeys[ _keyNamePair[keyCode] ] = keyCode;

					runDownHandler(_pressedKeys);
				}
			}else if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
				if(_duplFuncCode !== keyCode){
					_duplFuncCode = keyCode;

					_pressedKeys[ _keyNamePair[keyCode] ] = keyCode;					
					runDownHandler(_pressedKeys);	
				}
			}					

		});

		$(_win).on('keyup', function(e){
			var keyCode = e.keyCode || e.which;

			_duplFuncCode = -1;
			_duplKeyCode = -1;
			
			delete _pressedKeys[ _keyNamePair[keyCode] ];

			runUpHandler(_pressedKeys);	

		});

		return this;
	};

	module.setHandler = function(downHandler, upHandler){
		_downHandler = downHandler != null ? downHandler : null;
		_upHandler = upHandler != null ? upHandler : null;
	};

	function runDownHandler( transData ){
		if(_downHandler && typeof _downHandler === 'function') {
			_downHandler.call(this, {
				keys : transData
			});
		}
	}
	function runUpHandler( transData ){
		if(_upHandler && typeof _upHandler === 'function') {
			_upHandler.call(this, {
				keys : transData
			});
		}
	}

	return module;

};