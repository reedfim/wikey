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
  
  	chrome.tabs.getSelected(null, function(tab) {
  		var data = {};
		data.on = "이것은 될려나"+tab.id;
		data.mode = 'changed';
  		chrome.tabs.sendMessage(tab.id, {
				data : data
			}, function(response) {} //이 코드 부분에서는 상위의 sendResponse가 반응하지 않는다.
		);
	});
  	
 //  	chrome.tabs.getSelected(null, function(tab) {
	// 	var data = {};
	// 	data.on = "- background를 거쳐서 오는겨";
	// 	chrome.tabs.sendMessage(tab.id, {
	// 			data : data
	// 		}, function(response) {} //이 코드 부분에서는 상위의 sendResponse가 반응하지 않는다.
	// 	);
	// });
});

//background.js에서는 브라우저 액션 아이콘이 눌러질때마다, 모드를 변경하라는 메세지만 보낸다.
//그래서 contentScript로 추가된 로직에서 이 메세지에 따라 모드를 바꿔서 작동한다.
