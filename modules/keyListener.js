var keyListener = (function(){

	var duplKeyCode = -1, //일반적인 키는 중복으로 눌리기 때문에 한번만 켓치할 수 있도록 확인하는 변수
		duplFuncCode = -1,
		fromCh = String.fromCharCode,
		downHandler = null,
		upHandler = null,
		pressedKeys = {};
		

	function _listen(){
		console.log('bind keydown event');
		//등록된 Key Event handler를 없애고, 재 등록한다.
		$(window).on('keydown', function(e){
			
			var keyCode = e.keyCode || e.which;
			
			if ((keyCode >= 65 && keyCode <= 90) || (keyCode >=48 && keyCode <=57)){ //A-Z || 0-9
				if(duplKeyCode !== keyCode) {
					duplKeyCode = keyCode;
					
					pressedKeys[ keyNamePair[keyCode] ] = keyCode;

					runDownHandler(pressedKeys);
				}
			}else if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
				if(duplFuncCode !== keyCode){
					duplFuncCode = keyCode;

					pressedKeys[ keyNamePair[keyCode] ] = keyCode;					
					runDownHandler(pressedKeys);	
				}
			}					

		});

		$(window).on('keyup', function(e){
			var keyCode = e.keyCode || e.which;

			duplFuncCode = -1;
			duplKeyCode = -1;
			
			delete pressedKeys[ keyNamePair[keyCode] ];

		});

		$(window).on('blur', function(e){
			duplFuncCode = -1;
			duplKeyCode = -1;
			
			pressedKeys = {};
		})
	};

	//내부에서만 쓰일 함수
	function runDownHandler( keyData ){
		O.notifyObserver('*.updateKeyData', {
			type : MODE.current === MODE_TYPE.REG ? O.type.KEY_IN_REG : O.type.KEY_IN_CMD,
			keys : keyData
		});
	}

	return {
		listen : _listen
	};

})();






