//flag 값들을 가지고 있음
Application.models = Application.models || {};

Application.models.flag = {
	START_CHAR_CODE : 65, //A
	END_CHAR_CODE : 90, //Z
	START_NUM_CODE : 48, //0
	END_NUM_CODE : 57, //9

	CURRENT_MODE : '', //기본으로 실행모드로 작동 - VIEW, COMMAND
	DEFAULT_MODE : 'COMMAND'
};