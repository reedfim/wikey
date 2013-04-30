function Application(){
	var args = Array.prototype.slice.call(arguments),
		callback = args.pop(),
		modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
		i, len;

	if (!(this instanceof Application)) {
		return new Application(modules, callback);
	}

	//여기서 모든 모듈에서 사용할 공용 프로퍼티를 붙히면 되겠다.
	//아마도 Model 모듈을 여기서 연결하면 되지 않을까? ㅎㅎㅎ
	//this.name = 'Application SandBox';

	if (!modules || modules === '*' || modules[0] === '*') {
		modules = [];
		for (i in Application.modules) {
			if (Application.modules.hasOwnProperty(i)) {
				modules.push(i);
			}
		}
	}
	
	var param = [];
	for (i = 0, len = modules.length; i < len; i++ ) {
		//this에 추가를 하는것이 좋은지 아닌지는 확실히 모르겠다.
		if(Application.modules[modules[i]]){
			param.push(this[modules[i]] = Application.modules[modules[i]]());	
		}else if(Application.models[modules[i]]){
			param.push(this[modules[i]] = Application.models[modules[i]]());	
		}		
	}

	callback.apply(this,param);
};

Application.prototype = {
	name : 'Wikey Project',
	version : '0.1',
	getName : function(){
		return this.name;
	}
};

