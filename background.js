chrome.browserAction.onClicked.addListener(function(tabs) {

  	chrome.tabs.getSelected(null, function(tab) {
  		chrome.tabs.sendMessage(tab.id, {
				data : {start : true}
			}, function(response) {}
		);
	});
});
