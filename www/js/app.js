var lastLog = "";
var log = function(s) {
	if (lastLog != s) {
		$(".log").prepend("<li>" + s + "</li>");
		lastLog = s;
	}

};

var app = {
	debug : false,

	setDebug : function() {
		app.debug = true;
		$(".device-list").hide();
		$(".joystick").show();
		$(".face").hide();
	},
	init : function() {
		log("INIT");

		app.showLog(localStorage.log === "true");
		if (localStorage.byDirection === "true") {
			accel.stop();
		} else {
			accel.start();
		}

		$(".face").show();
		//localStorage.removeItem("robert_mac");
		document.addEventListener('deviceready', this.onDeviceReady, false);
		$(".joysick-location").html(Math.round($(".joysick-dot").position().left) + " : " + Math.round($(".joysick-dot").position().top));
	},
	onDeviceReady : function() {
		log("Device Ready");
		bt.onDeviceConnected = app.startEngagement;
		bt.onDeviceList = app.showList;
		bt.onDebugMode = app.setDebug;
		bt.log = function(s) {
			log("BT " + s);
		};
		bt.init();
	},
	listDevices : function() {
		bt.listDevices();
	},
	showList : function(list) {
		log("list devices");
		$(".device-list").show();
		$(".device-list ul").html("");
		list.forEach(function(item) {
			if (item.address == localStorage.robert_mac) {
				$(".device-list ul").append("<li onclick='app.setDevice(\"" + item.address + "\")'><img src='img/icon.png' style='max-height: 1em' />Robert</li>");
			} else {
				$(".device-list ul").append("<li onclick='app.setDevice(\"" + item.address + "\")'><i class='fa fa-android'></i>" + item.name + "</li>");
			}

		});
	},
	setDevice : function(mac) {
		log("Set Device");
		$(".face").show();
		$(".device-list").hide();
		bt.setDevice(mac, app.startEngagement, function() {
		});
	},
	startEngagement : function() {
		log("Found Robert");
		$(".face").hide();
		$(".joystick").show();
	},
	setSettings : function() {
		if ($(".settings").css("display") == "none") {
			$(".settings").fadeIn();
			log("set byDirection -- "+ (localStorage.byDirection==="true"));
			checkbox.set($("#i-navigation"), localStorage.byDirection==="true");
			checkbox.set($("#i-log"), localStorage.log==="true");
			checkbox.set($("#i-accelerometer"), localStorage.accelorometer!="true");
		} else {
			$(".settings").fadeOut();
			log("byDirection -- "+ (localStorage.byDirection==="true"));
			app.init();
		}
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
		$("#holder svg").css("transform", "translate(" + x + "px, " + y + "px)");
		//log(x + ":" + y);
		app.sendBT(x, y);
	},
	joysickEnd : function(event) {
		$("#holder svg").css("transform", "translate(0,0)");
		$(".joysick-location").html(Math.round($(".joysick-dot").position().left) + " : " + Math.round($(".joysick-dot").position().top));
		bt.stop();
	},
	accel : function(v) {
		localStorage.accelorometer = !v;
		if (v) {
			accel.start();
		} else {
			accel.stop();
		}

	},
	showLog : function(v) {
		if (v) {
			$(".log").show();

		} else {
			$(".log").hide();
		}
		localStorage.log = v;
	},
	sendBT : function(x, y) {
		if (Math.abs(x) < 10 && Math.abs(y) < 10) {
			bt.stop();
			return;
		}

		if (!localStorage.byDirection==="true") {
			var a = Math.round(Math.atan2(y, x) * 100);

			log(": " + a);

			bt.write(a);

		} else {
			if (Math.abs(x) > Math.abs(y)) {
				if (x < 0) {
					log("left");
					bt.goLeft();
				} else if (x > 0) {
					log("right");
					bt.goRight();
				}
			} else {
				if (y > 0) {
					log("back");
					bt.goBackward();
				} else if (y < 0) {
					log("forward");
					bt.goForward();
				}
			}
		}

	},
};
