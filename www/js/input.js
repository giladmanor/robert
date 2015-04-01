var input={
	change : function(that) {
		var element = $(that);
		input.inChange(element);
	},
	inChange : function(element) {
		
		if(element.attr("function")){
			eval(element.parent().attr("function")+"("+element.val()+")");
		}else if(element.parent().attr("variable")){
			eval(element.parent().attr("variable")+"="+element.val());
		}
		//alert(element.attr("id") + " : " + app.getTogglerValue(element.attr("id")));
	},
	set:function(element,val){
		
	}
};
