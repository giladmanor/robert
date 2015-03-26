var recorder = {
	data : [],
	lastCommand:"",
	lastTimestamp:0,
	actionFunc:function(c){},
	record : function(c) {
		if(c!=recorder.lastCommand){
			recorder.data.push({c:c,t:Date.now()-recorder.lastTimestamp});
			recorder.lastTimestamp = Date.now();
		}
	},
	play : function() {
		recorder.data.forEach(function(step){
			
		});
	},
	save : function() {
		var writer = new FileWriter("/sdcard/write.txt");
		writer.write(JSON.stringify(recorder.data) + "\n", false);
	},
};
