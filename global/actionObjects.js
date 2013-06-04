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
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('click', true, true);
				$('#previewTab a')[0].dispatchEvent(evt);	
			}			
		},
		enabled : function(){
			return $('#previewTab a')[0] != null ? true : false;
		}
	},
	richtext : {
		title : '리치텍스트',
		trigger : function(){
			console.log('richtitle');
			if($('#wysiwygTab a')[0]){
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('click', true, true);
				$('#wysiwygTab a')[0].dispatchEvent(evt);	
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
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('click', true, true);
				$('#markupTab a')[0].dispatchEvent(evt);
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
			if($('input[name=confirm]')[0]){
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('click', true, true);
				$('input[name=confirm]')[0].dispatchEvent(evt);
			}			
		},
		enabled : function(){
			return $('input[name=confirm]')[0] != null ? true : false;
		}
	},
	profilelayer : {
		title : '프로필상자 토글',
		trigger : function(){
			console.log('profilelayer');
			if($('#personal-info-sidebar .sidebar-collapse')[0]){
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('click', true, true); //type bubbling cancleable
				$('#personal-info-sidebar .sidebar-collapse')[0].dispatchEvent(evt);
			}
		},
		enabled : function(){
			return $('#personal-info-sidebar .sidebar-collapse')[0] != null ? true : false;
		}
	},
	restrictions : {
		title : '권한설정',
		trigger : function(){
			if($('#action-page-permissions-link')[0]){
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('click', true, true); //type bubbling cancleable
				$('#action-page-permissions-link')[0].dispatchEvent(evt);
			}
		},
		enabled : function(){
			return $('#action-page-permissions-link')[0] != null ? true : false;
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