
//뷰어는 등록할때 화면에 보여주는 역할만 한다.
(function Register(){

	var storage = localStorage,
		cmdData = null;
		$viewPanel = null,
		$selectedInpBox = null,
		keyString = '';


	//키 입력이 되었을때 반응하는 함수
	function updateKeyData( obsData ){
		if(obsData.type === O.type.KEY_IN_REG){
			if($selectedInpBox != null){
				var key = $selectedInpBox.data('menu');
				var count = 0, keyText = '';
				for(var key in obsData.keys){
					count++;
					keyText += (key + ' + ');
				}
				keyText = keyText.substr(0, keyText.length-3);

				if(count <= 4){ // 최대 4글자까지만 입력되게 함.
					$selectedInpBox.html(keyText);
				}
			}			
		}
	};
	//로컬스토리지에서 데이터를 빼오고,
	function active( obsData ){
		if(obsData.type === O.type.ACTIVE_REG){
			O.notifyObserver('commander.deactive', {
				type : O.type.DEACTIVE_CMD
			});
			console.log('show view');
			if($viewPanel == null) return;

			$viewPanel.removeClass('hide');
			$('#page').addClass('dimmed');
		}
	};

	//로컬스토리지에 데이터를 저장한다.
	function deactive( obsData ){
		if(obsData.type === O.type.DEACTIVE_REG){
			console.log('close view');
			if($viewPanel == null) return;

			$viewPanel.addClass('hide');
			$('#page').removeClass('dimmed');
		}
	};

	function saveData( menu, dataStr ){
		if(menu && dataStr){
			var cmd = dataStr.split(' + ');
			var actions = {};
			for(var i=0,len=cmd.length; i<len; i++){
				actions[cmd[i]] = true;
			}
			var saveCmd = {
				cmdStr : cmd.join('|'),
				keyCnt : cmd.length,
				actions : actions
			};
			storageData.set(menu, saveCmd);
		}
	}
	//옵저버 추가
	O.addObserver('register').add(updateKeyData).add(active).add(deactive);

	//Initialized
	function _init(){
		cmdData = {};
		$.each(storageData.getCmdList(), function(i, name){
			cmdData[name] = storageData.get(name);
		});

		var buttons = '', inputs = '';
		var i = 1;
		for(var key in cmdData){
			buttons += '<button class="btn comm" data-index="'+i+'">'+key+'</button>'
			inputs += '<div class="txt comm"><span class="txt_cmd inp'+i+'" data-menu="'+key+'">'+cmdData[key].cmdStr.split('|').join(' + ')+'</span><button class="btn_del">del</button></div>'
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

		
		$viewPanel = $(tmpl);		
		$viewPanel.on('click', '.btn', function(e){
			console.log(1);
			var target = $(this);
			var idx = target.data('index');
			var $inpBox = $('.txt_cmd.inp'+idx);
			
			$selectedInpBox && saveData($selectedInpBox.data('menu'), $selectedInpBox.html());
			$selectedInpBox = null;

			if($inpBox.hasClass('focus')){
				$inpBox.removeClass('focus');
				keyString = '';	

			}else{
				$('.txt_cmd').removeClass('focus');
				keyString = '';
				$inpBox.addClass('focus');
				$selectedInpBox = $inpBox;
			}			
		});

		$(document.body).append($viewPanel);
	};

	return {
		init : _init
	};

})().init();









