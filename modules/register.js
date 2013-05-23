
//뷰어는 등록할때 화면에 보여주는 역할만 한다.
var register = (function Register(){

	var storage = localStorage,
		cmdData = null;
		$viewPanel = null,
		$selectedInpBox = null,
		prevClickedName = ''; //이전에 클릭한 box_area가 있는지 name값을 통해 가지고 있는 변수
		


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
			//console.log('show view');
			if($viewPanel == null) return;

			$viewPanel.removeClass('hide');
			$('#page').addClass('dimmed');

			$(window).off('keyup', keyUpToSaveCancel).on('keyup', keyUpToSaveCancel);
		}
	};

	//로컬스토리지에 데이터를 저장한다.
	function deactive( obsData ){
		if(obsData.type === O.type.DEACTIVE_REG){
			//console.log('close view');
			if($viewPanel == null) return;
			
			$viewPanel.addClass('hide');
			$('#page').removeClass('dimmed');

			$(window).off('keyup', keyUpToSaveCancel);
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
	function removeData( menu ){
		if( menu ){
			storageData.set(menu, {});
		}
	}

	function keyUpToSaveCancel(e){
		e.stopPropagation();
		e.preventDefault();
		
		if($('#wikeyPanel .wrap_shortcut.active').length >= 1){
			if(e.keyCode === 27){ //ESC
				$('#wikeyPanel .wrap_shortcut').removeClass('active') //취소
				prevClickedName = '';
			}else if(e.keyCode === 13){ //ENTER
				$('#wikeyPanel .wrap_shortcut.active .btn_ok').trigger('click'); //저장 
			}	
		}		
	}
	

	//Initialized
	function init(){
		cmdData = {};
		$.each(wikiActions.getList(), function(i, name){
			cmdData[name] = storageData.get(name);
		});

		var actionList = [];
		for(var key in cmdData){
			actionList.push({
				name : key,
				keyStr : (cmdData[key].cmdStr && cmdData[key].cmdStr !== '') ? cmdData[key].cmdStr : '',
				hint : '클릭하여 ' + wikiActions[key].title + ' 단축키 등록'
			});
		}

		var templateText = '<div id="wikeyPanel">\
								<div class="fg_view">\
									<div class="bg_reg">\
										<%for(var i=0,len=actionList.length; i<len; i++){%>\
										<div class="box_area box_<%=actionList[i].name%>" data-name="<%=actionList[i].name%>" data-keystr="<%=actionList[i].keyStr%>">\
											<span class="box_inner hint--top  hint--info  hint--rounded" data-hint="<%=actionList[i].hint%>"></span>\
											<div class="wrap_shortcut">\
												<div class="view <%if(actionList[i].keyStr !== ""){%>show<%}else{%>hide<%}%>">\
													<span class="text"><%=actionList[i].keyStr.replace(/\|/g," + ")%></span>\
													<span class="btn btn_del hint--bottom hint--always hint--rounded" data-hint="삭제하려면 클릭하세요."></span>\
												</div>\
												<div class="edit <%if(actionList[i].keyStr === ""){%>show<%}else{%>hide<%}%>">\
													<span class="text hint--bottom hint--always hint--rounded" data-hint="등록할 단축키를 누르세요."></span>\
													<span class="btn btn_ok"></span>\
												</div>\
											</div>\
										</div>\
										<%}%>\
									</div>\
								</div>\
								<div class="bg_dimmed"></div>\
							</div>';

		var output = _.template(templateText, {
			actionList : actionList
		});

		$viewPanel = $(output);
		$(document.body).append($viewPanel);

		//BIND EVENT
		$('#wikeyPanel .box_area').on('click', function(e){
			e.stopPropagation();
			var $target = $(this);
			var $currentTarget = $(e.currentTarget);
			
			if(prevClickedName === '' || prevClickedName !== $target.data('name')){
				$target.parent().find('.wrap_shortcut').removeClass('active');
				$currentTarget.parent().find('.box_area').removeClass('on');
				
				$currentTarget.addClass('on');
				var $wrap = $target.find('.wrap_shortcut').addClass('active');
				$wrap.find('.show .text').html($target.data('keystr').replace(/\|/g,' + '));//데이터가 변경됬을 수도 있기 대문에 새로 덮어 씌운다.-class가 show인 노드에.
				
				if($wrap.find('.edit.show').length >= 1){ //열린 입력박스가 수정모드일 경우
					$selectedInpBox = $wrap.find('.edit .text');	
				}

				prevClickedName = $target.data('name');
			}else{
				$target.parent().find('.wrap_shortcut').removeClass('active');
				$currentTarget.parent().find('.box_area').removeClass('on');
				prevClickedName = '';
			}
			
		});

		//저장하기 - 저장한 후 창을 바로 닫음
		$('#wikeyPanel .btn_ok').on('click', function(e){
			e.stopPropagation();
			if( !$(this).parent().hasClass('show') ){ return;} //이벤트가 발동된 버튼의 상위 노드가 .edit.show인 클래스 값을 가질때만 동작한다.

			var $text = $(this).prev();
			var cmdText = $.trim($text.html());

			if(cmdText !== ''){
				saveData($text.closest('.box_area').data('name'), cmdText);
				// O.notifyObserver('indicator',{
				// 	type : O.type.SHOW_INDICATOR,
				// 	title : '저장 했어욤.'
				// });

				var $wrap = $(this).closest('.wrap_shortcut').removeClass('active');
				$(this).closest('.box_area').removeClass('on').data('keystr',cmdText.replace(/\s\+\s/g,'|'));
				$(this).prev().html('');
				$wrap.find('.edit').removeClass('show').addClass('hide');
				$wrap.find('.view').removeClass('hide').addClass('show');

				prevClickedName = '';
			}else{
				O.notifyObserver('indicator',{
					type : O.type.SHOW_INDICATOR,
					title : '단축키가 없네요~'
				});
			}
		});
		//삭제하기 - 삭제완료후 창을 닫지 않고 바로 입력 모드로 전환
		$('#wikeyPanel .btn_del').on('click', function(e){
			e.stopPropagation();

			var name = $(this).closest('.box_area').data('name');
			if(name && (name !== '')){
				removeData(name);
				// O.notifyObserver('indicator',{
				// 	type : O.type.SHOW_INDICATOR,
				// 	title : '삭제 됬어욤.'
				// });

				var $wrap = $(this).closest('.wrap_shortcut');
				$(this).closest('.box_area').data('keystr','');
				$(this).prev().html('');
				$wrap.find('.view').removeClass('show').addClass('hide');
				$wrap.find('.edit').removeClass('hide').addClass('show');

				if($wrap.find('.edit.show').length >= 1){ //열린 입력박스가 수정모드일 경우
					$selectedInpBox = $wrap.find('.edit .text');	
				}
			}else{
				O.notifyObserver('indicator',{
					type : O.type.SHOW_INDICATOR,
					title : 'ERROR!!'
				});
			}
		});

		$('#wikeyPanel').on('click', function(e){
			e.stopPropagation();
			$('#wikeyPanel .wrap_shortcut').removeClass('active') //취소
			$('#wikeyPanel .box_area').removeClass('on')
			prevClickedName = '';
		});
		$(window).off('keyup', keyUpToSaveCancel).on('keyup', keyUpToSaveCancel);
	
	};

	return {
		init : init,
		updateKeyData : updateKeyData,
		active : active,
		deactive : deactive
	};

})();









