//키 이벤트를 켓치하는 모듈

Application.modules = Application.modules || {};

Application.modules.keyCatcher = function(box){
	var _win = window,
		_duplKeyCode = -1, //일반적인 키는 중복으로 눌리기 때문에 한번만 켓치할 수 있도록 확인하는 변수
		_fromCh = String.fromCharCode,
		_callback = null,
		_keyNamePair = Application.models.keyNamePair;
		

	box.bindKeyEvent = function(){
		console.log('bind keydown event');
		$(_win).on('keydown', function(e){
			var keyCode = e.keyCode || e.which,
				keyName = '';
			
			if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
				keyName = _keyNamePair[keyCode];
				runCallback(keyName, keyCode);
			}

			if ((keyCode >= 65 && keyCode <= 90) || (keyCode >=48 && keyCode <=57)){ //A-Z || 0-9
				if(_duplKeyCode !== keyCode) {
					keyName = _keyNamePair[keyCode];
					_duplKeyCode = keyCode;
					runCallback(keyName, keyCode);
				}
			}			

		});

		return this;
	};

	box.regEventCallback = function(func){
		_callback = func;
	};

	function runCallback(keyName, keyCode){
		if(_callback && typeof _callback === 'function') {
			_callback.call(this, {
				keyName : keyName,
				keyCode : keyCode
			});
		}
	}

};