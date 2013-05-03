//등록모드에서 DOM을 핸들링 하는 모듈
Application.modules = Application.modules || {};

//뷰어는 등록할때 화면에 보여주는 역할만 한다.
Application.modules.assignor = function(base){
	var module = base != null ? $.extend(module, base) : {};

	var storage = localStorage,
		cmdData = null;
		viewPanel = null,
		selectedInpBox = null,
		keyString = '';



	module.init = function( data ){
		cmdData = data;
		var buttons = '', inputs = '';
		var i = 1;
		for(var key in cmdData){
			buttons += '<button class="btn comm" data-menu="'+key+'" data-index="'+i+'">'+key+'</button>'
			inputs += '<div class="txt comm"><span class="txt_cmd inp'+i+'" data-menu="'+key+'"></span><button class="btn_del">del</button></div>'
			i++;
		}

		var tmpl = '<div id="wikeyPanel">\
						<div class="fg_view">\
							<div class="box_control">\
								<div class="btn_group">'+buttons+'</div>\
								<div class="inp_group">'+inputs+'</div>\
							</div>\
						</div>\
						<div class="bg_dimmed"></div>\
					</div>';

		
		viewPanel = $(tmpl);		
		viewPanel.on('click', '.btn', function(e){
			var target = $(this);
			var idx = target.data('index');
			var inpBox = $('.txt_cmd.inp'+idx);
			
			selectedInpBox = null;

			if(inpBox.hasClass('focus')){
				inpBox.removeClass('focus');
				keyString = '';	
			}else{
				$('.txt_cmd').removeClass('focus');
				keyString = '';
				inpBox.addClass('focus');
				selectedInpBox = inpBox;
			}			
		});

		$(document.body).append(viewPanel);

		return this;
	};

	module.setDataOnView = function( pressedKeys ){
		if(selectedInpBox != null){
			var key = selectedInpBox.data('menu');
			var count = 0, keyText = '';
			for(var key in pressedKeys){
				count++;
				keyText += (key + ' + ');
			}
			keyText = keyText.substr(0, keyText.length-3);

			if(count <= 4){ // 최대 4글자까지만 입력되게 함.
				selectedInpBox.html(keyText);
			}
		}		
	};

	//로컬스토리지에서 데이터를 빼오고,
	module.active = function(){
		console.log('show view');
		if(viewPanel == null) return;

		viewPanel.removeClass('hide');
		$('#page').addClass('dimmed');

		return this;
	};

	//로컬스토리지에 데이터를 저장한다.
	module.deactive = function(){
		console.log('close view');
		if(viewPanel == null) return;

		viewPanel.addClass('hide');
		$('#page').removeClass('dimmed');

		return this;
	};

	return module;
};