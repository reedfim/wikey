
Application.modules = Application.modules || {};

Application.modules.keyListener = function(base){
	var module = base != null ? $.extend(module, base) : {};

	var _win = window,
		_duplKeyCode = -1, //일반적인 키는 중복으로 눌리기 때문에 한번만 켓치할 수 있도록 확인하는 변수
		_duplFuncCode = -1,
		_fromCh = String.fromCharCode,
		_callback = null,
		_keyNamePair = Application.prototype.keyNamePair;
		

	module.listen = function(){
		console.log('bind keydown event');
		//등록된 Key Event handler를 없애고, 재 등록한다.
		$(_win).on('keydown', function(e){
			
			var keyCode = e.keyCode || e.which,
				keyName = '';
			
			if ((keyCode >= 65 && keyCode <= 90) || (keyCode >=48 && keyCode <=57)){ //A-Z || 0-9
				if(_duplKeyCode !== keyCode) {
					keyName = _keyNamePair[keyCode];
					keyNameFull = keyName + 'Key';
					_duplKeyCode = keyCode;
					runCallback(keyName, keyNameFull, keyCode);
				}
			}else if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
				if(_duplFuncCode !== keyCode){
					keyName = _keyNamePair[keyCode];
					keyNameFull = keyName + 'Key';
					_duplFuncCode = keyCode;
					runCallback(keyName, keyNameFull, keyCode);	
				}
			}					

		});

		$(_win).on('keyup', function(e){
			_duplFuncCode = -1;
			_duplKeyCode = -1;
		});

		return this;
	};

	module.getKey = function(func){
		_callback = func;
	};

	function runCallback(keyName, keyNameFull, keyCode){
		if(_callback && typeof _callback === 'function') {
			_callback.call(this, {
				keyName : keyName,
				keyNameFull : keyNameFull,
				keyCode : keyCode
			});
		}
	}

	return module;

};