var wikiActions = {
	sidebar : function(){
		console.log('sidebar');
		$('#splitter-button').trigger('click');
	},
	edit : function(){
		console.log('edit');
		location.href = $('#editPageLink').attr('href');		
	},
	preview : function(){
		console.log('preview');
		$('#previewTab a').trigger('click');
	},
	richtext : function(){
		console.log('richtext');
		$('#wysiwygTab a').trigger('click');
	},
	markup : function(){
		console.log('markup');
		$('#markupTab a').trigger('click');
	},
	save : function(){
		console.log('save');
		$('#editpageform').submit();
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