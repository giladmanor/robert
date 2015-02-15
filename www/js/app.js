var success = function(){};
var failure = function(e){
	alert("Error " + e);
};


var btStop=function(){
	bluetoothSerial.write(" ", success, failure);
};
var btForward=function(){
	bluetoothSerial.write("a", success, failure);
};
var btBack=function(){
	bluetoothSerial.write("b", success, failure);
};
var btRight=function(){
	bluetoothSerial.write("c", success, failure);
};
var btLeft=function(){
	bluetoothSerial.write("d", success, failure);
};



var app = {
	init : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		$(".joysick-location").html(Math.round($(".joysick-dot").position().left)+" : "+Math.round($(".joysick-dot").position().top));
	},
	onDeviceReady : function() {
		bluetoothSerial.isEnabled(function() {
			bluetoothSerial.list(function(list){
				list.forEach(function(item){
					$(".device-list ul").append("<li onclick='app.setDevice(\""+item.address+"\")'>"+item.name+"</li>");
					
				});
			}, function(){
				alert("could not get the list of devices, boo hoo...");
			});
		}, function() {
			alert("Please turn on Bluetooth");
		});

	},
	joysickStart:function(event){
		//alert("start");
		app.joysick = {x:event.touches[0].pageX,y:event.touches[0].pageY};
		
	},
	
	joysickMove:function(event){
		var x = event.touches[0].pageX - app.joysick.x;
		var y = event.touches[0].pageY - app.joysick.y;
		
		$(".joysick-location").html(Math.round(x)+" : "+Math.round(y));
		$(".joysick-dot").css("transform","translate("+x+"px, "+y+"px)");
	},
	
	joysickEnd:function(event){
		$(".joysick-dot").css("transform","translate(0,0)");
		$(".joysick-location").html(Math.round($(".joysick-dot").position().left)+" : "+Math.round($(".joysick-dot").position().top));
		
		btStop();
		
	},
	setDevice:function(macAddress){
		bluetoothSerial.connectInsecure(macAddress, function(d){
			alert("success " + d);
			$(".device-list").hide();
			$(".joystick").show();
		}, function(e){
			alert("Error " + e);
		});
	},
	
	sendBT:function(x,y){
		if(x<0){
			btForward();
		}else if(x>0){
			btBack();
		}
		
		if(y>0){
			btLeft();
		}else if(y<0){
			btRight();
		}
		
		
		
	},
	
	
};
