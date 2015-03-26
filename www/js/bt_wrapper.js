var bt = {
	onDeviceConnected : function() {},
	onDeviceList : function(list) {},
	onDebugMode:function(){},
	log:function(s){},
	init : function() {
		bluetoothSerial.isEnabled(function() {
			// IS ENABLED
			bt.log("ENABLED");
			if (localStorage.robert_mac) {
				bt.log("trying to connect to Robert on " + localStorage.robert_mac);
				bt.setDevice(localStorage.robert_mac, bt.onDeviceConnected, bt.listDevices);
			} else {
				bt.log("1 list");
				bt.listDevices();
				bt.log("2 list");
			}
		}, function() {
			// NOT ENABLED
			bt.log("DISABLED");
			bt.onDebugMode();
		});
	},
	listDevices : function() {
		bt.log("trying to list devices");
		//bluetoothSerial.disconnect();
		bluetoothSerial.list(bt.onDeviceList, function() {
			bt.failure("Could not List Bluetooth Devices");
		});
	},
	setDevice : function(macAddress, onSuccess, onFail) {
		if (macAddress) {
			localStorage.robert_mac = macAddress;
			bt.log("connecting to robert");
			bluetoothSerial.connectInsecure(macAddress, onSuccess,onFail);
		}
	},
	joysick : {
		forward : "a",
		backward : "b",
		left : "c",
		right : "d"
	},
	lastCommand : "",
	success : function() {
	},
	failure : function(e) {
		alert("Error" + e);
	},
	write : function(c) {
		if (bt.lastCommand != c) {
			bt.lastCommand = c;
			bluetoothSerial.write(c, bt.success, bt.failure);
		}
	},
	goForward : function() {
		bt.write(bt.joysick.forward);
	},
	goBackward : function() {
		bt.write(bt.joysick.backward);
	},
	goLeft : function() {
		bt.write(bt.joysick.left);
	},
	goRight : function() {
		bt.write(bt.joysick.right);
	},
	stop : function() {
		bt.write("-");
	},
	
};
