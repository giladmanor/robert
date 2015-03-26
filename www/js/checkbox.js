var checkbox={
	toggle : function(that) {
		var element = $(that).parent();
		checkbox.inToggle(element);
	},
	inToggle : function(element) {
		if (element.children("i:first").hasClass("fa-toggle-on")) {
			element.children("i:first").removeClass("fa-toggle-on");
			element.children("i:first").addClass("fa-toggle-off");
			element.children("span:first").html(element.attr("offText"));
			element.children("div.extra").hide();
		} else {
			element.children("i:first").removeClass("fa-toggle-off");
			element.children("i:first").addClass("fa-toggle-on");
			element.children("span:first").html(element.attr("onText"));
			element.children("div.extra").show();
		}
		//alert(element.attr("id") + " : " + app.getTogglerValue(element.attr("id")));
	}
};
