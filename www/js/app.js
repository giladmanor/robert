var success = function() {
};
var failure = function(e) {
	alert("Error " + e);
};

var log = function(s) {
	$(".log").html("<li>" + s + "</li>");
};

var btStop = function() {
	log("-");
	btWrite("-");
};
var lastCommand = "";

var btWrite = function(c) {
	if (lastCommand != c) {
		lastCommand = c;
		bluetoothSerial.write(c, success, failure);
	}

};

var app = {
	debug : false,
	
	setDebug : function() {
		app.debug = true;
		$(".device-list").hide();
		$(".joystick").show();
	},
	init : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		$(".joysick-location").html(Math.round($(".joysick-dot").position().left) + " : " + Math.round($(".joysick-dot").position().top));
	},
	onDeviceReady : function() {
		if (localStorage.robert_mac) {
			app.setDevice(localStorage.robert_mac, function() {
				$(".device-list").hide();
				$(".joystick").show();
			}, function() {
				app.listDevices();
			});

		}

	},
	listDevices : function() {
		bluetoothSerial.isEnabled(function() {
			var onSuccess = function() {
				$(".device-list").hide();
				$(".joystick").show();
			};
			var onFail = function() {
				alert("Robert is not responding");
			};
			bluetoothSerial.list(function(list) {
				list.forEach(function(item) {
					if (item.address == localStorage.robert_mac) {
						$(".device-list ul").append("<li onclick='app.setDevice(\"" + item.address + "\"," + onSuccess + "," + onFail + ")'><img src='img/icon.png' style='max-height: 1em' /></li>");
					} else {
						$(".device-list ul").append("<li onclick='app.setDevice(\"" + item.address + "\"," + onSuccess + "," + onFail + ")'>" + item.name + "</li>");
					}

				});

			}, function() {
				alert("could not get the list of devices, boo hoo...");
			});
		}, function() {
			$(".device-list ul").append("<li onclick='app.setDevice()'>debug</li>");
		});
	},
	joysickStart : function(event) {
		//alert("start");
		app.joysick = {
			x : event.touches[0].pageX,
			y : event.touches[0].pageY
		};

	},

	joysickMove : function(event) {
		var x = event.touches[0].pageX - app.joysick.x;
		var y = event.touches[0].pageY - app.joysick.y;

		$(".joysick-location").html(Math.round(x) + " : " + Math.round(y));
		$(".joysick-dot").css("transform", "translate(" + x + "px, " + y + "px)");
		//log(x + ":" + y);
		app.sendBT(x, y);
	},

	joysickEnd : function(event) {
		$(".joysick-dot").css("transform", "translate(0,0)");
		$(".joysick-location").html(Math.round($(".joysick-dot").position().left) + " : " + Math.round($(".joysick-dot").position().top));

		btStop();

	},
	setDevice : function(macAddress, onSuccess, onFail) {
		$(".face").show();
		if (macAddress) {
			localStorage.robert_mac = macAddress;
			bluetoothSerial.connectInsecure(macAddress, function(d) {
				onSuccess();
				$(".face").hide();
			}, function(e) {
				$(".face").hide();
				onFail();
			});
		}

	},

	sendBT : function(x, y) {
		if (Math.abs(x) < 10 && Math.abs(y) < 10) {
			btStop();
			return;
		}
		if (Math.abs(x) > Math.abs(y)) {
			if (x < 0) {
				log("left");
				btWrite("c");
			} else if (x > 0) {
				log("right");
				btWrite("d");
			}
		} else {
			if (y > 0) {
				log("back");
				btWrite("b");
			} else if (y < 0) {
				log("forward");
				btWrite("a");
			}
		}

	},
};
