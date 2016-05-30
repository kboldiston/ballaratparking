var app=angular.module('bpModule', ['ngMap']);
	app.controller('getParkInfo', function(NgMap) {
	var parkInfo = this;
	NgMap.getMap().then(function(map) {
		parkInfo.map = map;
	})

	parkInfo.onClick = function(event) {
		parkInfo.attributes = event.feature.H; /* this is the info on the park/meter */
	};
});
