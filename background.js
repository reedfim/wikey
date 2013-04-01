chrome.runtime.onMessage.addListener( //일시적 연결이다.
	function(request, sender, sendResponse) {
		sendResponse({data : "데이터 보냈다."});
		chrome.tabs.getSelected(null, function(tab) {
			request.data.on += "- background를 거쳐서 오는겨";
			chrome.tabs.sendMessage(tab.id, {
					data : request.data
				}, function(response) {} //이 코드 부분에서는 상위의 sendResponse가 반응하지 않는다.
			);
		});
	}
);
//지속적인 연결을 만들려면, port를 쓰면 될 것 같은데,, 아직 잘 모르겠다 흠..


//브라우저 액션의 아이콘을 클릭하면 반응하는것이,, 이게 아닌가 보다.. 나중에 다시 살펴보자..
chrome.browserAction.onClicked.addListener(function() {
  chrome.extenstion.getView().alert('ads');
  chrome.tabs.getSelected(null, function(tab) {
		var data = "아이콘 클릭한것임";
		chrome.tabs.sendMessage(tab.id, {
				data : data
			}, function(response) {} //이 코드 부분에서는 상위의 sendResponse가 반응하지 않는다.
		);
	});
});

