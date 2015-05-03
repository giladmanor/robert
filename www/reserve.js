app.init();
		//app.slingshot();
		//app.avalanche();
		document.addEventListener("deviceready", onDeviceReady, false);

		// device APIs are available
		//
		function onDeviceReady() {
			document.addEventListener("backbutton", gallery.back, true);
			setInterval(function() {
				navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
				// navigator.compass.getCurrentHeading(onCompassSuccess, onError);
			}, 100);

			setInterval(function() {
				navigator.accelerometer.getCurrentAcceleration(backgroundMotion, onError);
				// navigator.compass.getCurrentHeading(onCompassSuccess, onError);
			}, 500);

		}

		function backgroundMotion(acceleration) {
			$("body").animate({
				"background-position-x" : (50 + acceleration.x / 3) + '%',
				"background-position-y" : (20 - acceleration.y / 3) + '%',

			}, 400);
		}

		var heading = 0;
		function onCompassSuccess(heading) {
			$(".consol").html(heading.magneticHeading);
		}

		// onSuccess: Get a snapshot of the current acceleration
		//
		function onSuccess(acceleration) {

			//var v = 'Acceleration X: ' + acceleration.x + ' Acceleration Y: ' + acceleration.y;
			app.flipGavity(acceleration);
			//$("body").css('background-position', (50 + acceleration.x / 2) + '% ' + (20 - acceleration.y / 2) + '%');

		}

		// onError: Failed to get the acceleration
		//
		function onError() {
			alert('onError!');
		}

		setTimeout(function() {
			//gallery.show(this,app.softBody);
			console.log(navigator);
		}, 1000);