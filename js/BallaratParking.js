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

	parkInfo.deleteMarkers = function(dataType) {
		map = parkInfo.map;
		console.log(map);
		map.data.forEach(function (feature) {
			if(typeof feature.f.area === 'undefined'){
				featureSource = 'Car Park';
			}
			if(typeof feature.f.area !== 'undefined'){
				featureSource = 'Parking Meter';
			}


			if(featureSource === dataType) {
				map.data.remove(feature);
			} 

		})
	}

	parkInfo.hideDetail = function() {
		parkInfo.map.hideInfoWindow('informationSection');
	}
});
