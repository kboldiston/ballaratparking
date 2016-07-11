var app=angular.module('bpModule', ['ngMap']);
	app.controller('getParkInfo', function(NgMap) {
	var parkInfo = this;

	NgMap.getMap().then(function(map) {
		parkInfo.map = map;
		console.log(parkInfo);
	})

	parkInfo.onClick = function(event) {
		console.log(this);
		parkInfo.attributes = event.feature.H; /* this is the info on the park/meter */
		console.log(parkInfo.map);
		parkInfo.map.showInfoWindow('informationSection', thePark.attributes.id);
	}

	parkInfo.hideDetail = function() {
		parkInfo.map.hideInfoWindow('informationSection');
	}
});
