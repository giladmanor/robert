var checkbox = {
	toggle : function(that) {
		var element = $(that).parent();
		checkbox.inToggle(element);
	},
	inToggle : function(element) {
		if (element.children("i:first").hasClass("fa-toggle-on")) {
			//ON
			checkbox.setOn(element);

		} else {
			//OFF
			checkbox.setOff(element);
		}

		//alert(element.attr("id") + " : " + app.getTogglerValue(element.attr("id")));
	},
	render : function(element) {
		if (element.attr("function")) {
			eval(element.attr("function") + "(" + element.children("i:first").hasClass("fa-toggle-on") + ")");
		} else if (element.attr("variable")) {
			eval(element.attr("variable") + "=" + element.children("i:first").hasClass("fa-toggle-on"));
		}
	},
	setOn : function(element) {
		element.children("i:first").removeClass("fa-toggle-on");
		element.children("i:first").addClass("fa-toggle-off");
		element.children("span:first").html(element.attr("offText"));
		element.children("div.extra").hide();
		checkbox.render(element);
	},
	setOff : function(element) {
		element.children("i:first").removeClass("fa-toggle-off");
		element.children("i:first").addClass("fa-toggle-on");
		element.children("span:first").html(element.attr("onText"));
		element.children("div.extra").show();
		checkbox.render(element);
	},
	set : function(element,val) {
		if(val){
			checkbox.setOn(element);
		}else{
			checkbox.setOff(element);
		}
	}
};
