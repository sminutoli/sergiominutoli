var validations = {};
function init(){
	$("#contactForm").hide();
	$("#submit").attr( "disabled", true );
	
	$("#head .contact").bind( "click", show_form );
	$("#nameField, #emailField, #commentField").bind( "focus", clear );
	$("#nameField, #emailField, #commentField").bind( "blur", check_reset );
	$("#nameField, #commentField").bind("blur", validateEmpty );
	$("#emailField").bind("blur", validateMail );
}
function validateEmpty(e){
	var field = $(e.target);
	var value = field.val();
	var check = value != field.attr("title") && value.length > 2;
	field.css( "border-left-color", check ? "orange" : "red" );
	validations[ field.attr("id") ] = check;
	check_validations();
}
function validateMail(e){
	var field = $(e.target);
	var validator = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	var check = validator.test( field.val() );
	field.css( "border-left-color", check ? "orange" : "red" );
	validations[ field.attr("id") ] = check;
	check_validations();
}
function check_reset(e){
	var field = $(e.target);
	var value = field.val();
	if( value == ""){
		field.val( field.attr("title") );
		field.bind( "focus", clear );
	}	
}
function check_validations(){
	var allTrue = true;
	for( var prop in validations ){
		if( validations[prop] == false ){
			allTrue = false;
			break;
		}
	}
	$("#submit").attr( "disabled", !allTrue );
}
function clear(e){
	var field = $(e.target);
	field.val("");
	$(e.target).unbind( "focus", clear );
}
function show_form(){
	$("#contactForm").show(1000);
}


$(document).ready( init );