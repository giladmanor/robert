var checkbox={
	toggle : function(that) {
		var element = $(that).parent();
		checkbox.inToggle(element);
	},
	inToggle : function(element) {
		if (element.children("i:first").hasClass("fa-toggle-on")) {
			//ON
			element.children("i:first").removeClass("fa-toggle-on");
			element.children("i:first").addClass("fa-toggle-off");
			element.children("span:first").html(element.attr("offText"));
			element.children("div.extra").hide();
			
		} else {
			//OFF
			element.children("i:first").removeClass("fa-toggle-off");
			element.children("i:first").addClass("fa-toggle-on");
			element.children("span:first").html(element.attr("onText"));
			element.children("div.extra").show();
		}
		
		if(element.attr("function")){
			eval(element.attr("function")+"("+element.children("i:first").hasClass("fa-toggle-on")+")");
		}else if(element.attr("variable")){
			eval(element.attr("variable")+"="+element.children("i:first").hasClass("fa-toggle-on"));
		}
		//alert(element.attr("id") + " : " + app.getTogglerValue(element.attr("id")));
	}
};
