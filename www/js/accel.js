var accel = {
	sampler : null,
	handler : function(acceleration) {
		log(acceleration.x);
		log(acceleration.y);
	},
	start : function() {
		if (!accel.sampler) {
			accel.sampler = setInterval(function() {
				navigator.accelerometer.getCurrentAcceleration(accel.handler, function(e) {
					alert(e);
				});
			}, 999100);
		}

	},
	stop : function() {
		if(!accel.sampler){
			clearInterval(accel.sampler);
		}
	},
};
