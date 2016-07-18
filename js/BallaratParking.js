var app=angular.module('ballaratParking', ['ngMap','ngMaterial']);

app.controller('getParkInfo', function($scope, NgMap) {
	var parkInfo = this;

	NgMap.getMap().then(function(map) {
		parkInfo.map = map;
	})

	parkInfo.onClick = function(event) {
		feature = event.feature.f; /* this is the info on the park/meter */
		console.log(feature);
	//	parkInfo.map.showInfoWindow('informationSection', feature.id);
		//broadcast to ngmap controller to remove items 
		$scope.$broadcast("showSign", {'feature': feature});
	}


	parkInfo.deleteMarkers = function(dataType) {
		map = parkInfo.map;
		map.data.forEach(function (feature) {
			if(dataType === '*') {
				map.data.remove(feature);
			} else {
				if(typeof feature.f.area === 'undefined'){
					featureSource = 'Car Parks';
				}
				if(typeof feature.f.area !== 'undefined'){
					featureSource = 'Parking Meters';
				}
				if(featureSource === dataType) {
					map.data.remove(feature);
				} 
			}
		})
	}

	parkInfo.hideDetail = function() {
		parkInfo.map.hideInfoWindow('informationSection');
	}

	$scope.$on("removeMapData", function(event, args) {
		dataType = args.item;
		parkInfo.deleteMarkers(dataType);
	});
	
});


/**
* You must include the dependency on 'ngMaterial' 
*/
app.controller('MenuCtrl', function($scope, $timeout, $mdSidenav, $log){
	$scope.toggleLeft = buildToggler('left');
	$scope.isOpenLeft = function(){
		return $mdSidenav('leftNavbar').isOpen();
	};

	function buildToggler(navID) {
		return function() {
			$mdSidenav(navID)
				.toggle();
		}
	}

});

app.controller('FilterCtrl', function($scope) {
	$scope.items = ['Car Parks', 'Parking Meters'];
	$scope.selected = ['Car Parks', 'Parking Meters'];
	$scope.selected = ['Car Parks'];
	$scope.toggle = function (item, list) {
		var idx = list.indexOf(item);
		/*if the item is in the list (data showing)*/ 
		/*then remove the item from the list       */
		if (idx > -1) {
			list.splice(idx, 1);
			//broadcast to ngmap controller to remove items 
			$scope.$broadcast("removeMapData", {'item': item});
		}
		/* else add the data to the list */
		else {
			list.push(item);
		}
	};

	$scope.exists = function(item, list) {
		return list.indexOf(item) > -1;
	};
	$scope.isIndeterminate = function() {
		return ($scope.selected.length !== 0 &&
					$scope.selected.length !== $scope.items.length);
	};
	$scope.isChecked = function() {
		return $scope.selected.length === $scope.items.length;
	};
	$scope.toggleAll = function() {
		if($scope.selected.length === $scope.items.length) {
			$scope.selected = [];
			//broadcast to ngmap controller to remove items 
			$scope.$broadcast("removeMapData", {'item': '*'});
		} else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
			$scope.selected = $scope.items.slice(0);
		}
	}

});

app.controller('dialogCtrl', function($scope, $mdDialog, $mdMedia) {
	$scope.status = ' ';
	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	$scope.showSign = function(ev, feature) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
		$mdDialog.show({
			controller: DialogController,
			templateUrl: './sign.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: useFullScreen,
			locals: {
				'feature': feature
			}
		})
	}

	$scope.$on('showSign', function(event, args) {
		var feature = args.feature;
		$scope.showSign(feature);
	})
});
function DialogController($scope, $mdDialog) {
	$scope.hide = function() {
 		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
}
	
