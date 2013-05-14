var indicator = (function indicator(){

	var $indicator;
	var $panel;


	function show( obsData ){
		if(obsData.type === O.type.SHOW_INDICATOR){
			console.log('#################### '+obsData.title+' #####################');
			$panel.show();
			$indicator.html(obsData.title);
			$indicator.fadeIn('fast', function(){
				setTimeout(function(){ //자동으로 사라짐
					hide();
				}, 500);
			});			
		}	
	}
	function hide(){
		$indicator.fadeOut('fast', function(){
			$panel.hide();
		});
	}


	function init(){
		var html = '<div class="wikey_cmd_bg"><div class="wikey_indicator"></div></div>';
		$panel = $(html);
		
		$indicator = $panel.find('.wikey_indicator');

		$(document.body).append($panel);
	}

	return {
		init : init,
		show : show
	};

})();