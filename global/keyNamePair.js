//입력된 키의 코드와 그 키의 의미를 가지고 있는 객체

Application && ( Application.prototype.keyNamePair = (function(){
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
})() );
