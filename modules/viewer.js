//등록모드에서 DOM을 핸들링 하는 모듈
Application.modules = Application.modules || {};

//뷰어는 등록할때 화면에 보여주는 역할만 한다.
Application.modules.viewer = function(box){
	var _viewPanel = null;
	var _clickedTextBox = null;

	box.viewInit = function(){
		console.log('view init');
		_viewPanel = $('<div></div>').attr('id','wikeyPanel').addClass('hide');
		
		var actionGroup = $('<div></div>').addClass('group');

		var boxArray = [];
		for(var i=0,len=4; i<len; i++){
			var box = $('<div></div>').addClass('box_cmd'),
				text = $('<span></span>').addClass('inp_text'),
				btn = $('<button>버튼 '+(i+1)+'</button>').addClass('btn_comm').addClass('btn'+(i+1));
			
			btn.on('click', function(e){
				_clickedTextBox = $(e.target).next();
				console.log(_clickedTextBox[0].className);
			});

			box.append(btn).append(text);

			boxArray.push(box);
		}

		$.each(boxArray, function(index, btnNode){
			actionGroup.append(btnNode);
		});

		_viewPanel.append(actionGroup);
		$(document.body).append(_viewPanel);
	};

	box.setDataOnView = function(data){
		if(_clickedTextBox != null){
			_clickedTextBox.html(data);	
		}		
	};

	box.showView = function(){
		console.log('show view');
		if(_viewPanel == null) return;

		_viewPanel.removeClass('hide');
		$('#page').addClass('dimmed');
	};
	box.closeView = function(){
		console.log('close view');
		if(_viewPanel == null) return;

		_viewPanel.addClass('hide');
		$('#page').removeClass('dimmed');
	};
};