var wikiActions = {
	sidebar : {
		title : '사이드바 토글',
		trigger : function(){
			console.log('sidebar');
			if($('#splitter-button')[0]){
				$('#splitter-button').trigger('click');
			}
		},
		enabled : function(){
			return $('#splitter-button')[0] != null ? true : false;
		}
	},
	edit : {
		title : '글 수정',
		trigger : function(){
			console.log('edit');
			if($('#editPageLink')[0]){
				location.href = $('#editPageLink').attr('href');			
			}			
		},
		enabled : function(){
			return $('#editPageLink')[0] != null ? true : false;
		}
	},
	preview : {
		title : '프리뷰 보기',
		trigger : function(){
			console.log('preview');
			if($('#previewTab a')[0]){
				$('#previewTab a').trigger('click');	
			}			
		},
		enabled : function(){
			return $('#previewTab a')[0] != null ? true : false;
		}
	},
	richtitle : {
		title : '리치텍스트',
		trigger : function(){
			console.log('richtitle');
			if($('#wysiwygTab a')[0]){
				$('#wysiwygTab a').trigger('click');	
			}			
		},
		enabled : function(){
			return $('#wysiwygTab a')[0] != null ? true : false;
		}
	},
	markup : {
		title : '마크업',
		trigger : function(){
			console.log('markup');
			if($('#markupTab a')[0]){
				$('#markupTab a').trigger('click');	
			}			
		},
		enabled : function(){
			return $('#markupTab a')[0] != null ? true : false;
		}
	},
	save : {
		title : '저장하기',
		trigger : function(){
			console.log('save');
			if($('#editpageform')[0]){
				$('#editpageform').submit();	
			}			
		},
		enabled : function(){
			return $('#editpageform')[0] != null ? true : false;
		}
	},

	getList : function(){
		var list = [];

		for(var actName in this){
			if(this.hasOwnProperty(actName) && actName !== 'getList'){
				list.push(actName);
			}
		}

		return list;
	}
};