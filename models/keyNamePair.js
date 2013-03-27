//입력된 키의 코드와 그 키의 의미를 가지고 있는 객체
Application.models = Application.models || {};

Application.models.keyNamePair = (function(){
	var flag = Application.models.flag,
		nameValuePair = {},
		i, fromChar = String.fromCharCode;

	nameValuePair['16'] = 'shift';
	nameValuePair['17'] = 'ctrl';
	nameValuePair['18'] = 'alt';
	nameValuePair['91'] = 'meta';

	for (i = flag.START_CHAR_CODE; i <= flag.END_CHAR_CODE; i++) {
		nameValuePair[i] = fromChar(i);
	}
	for (i = flag.START_NUM_CODE; i <= flag.END_NUM_CODE; i++) {
		nameValuePair[i] = fromChar(i);	
	}

	return nameValuePair;
})();
