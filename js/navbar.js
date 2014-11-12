SMNavBar = new function(){
	
	var theNavBar = null;
	var theLinks = null;
	var theMarker = null;
	var btnActive = null;
	var lastClasses = null;
	var animating = false;
	var animatingSteps = [ 
		{ delay: 1000, value: 'designer' },
		{ delay: 2000, value: 'developer' },
		{ delay: 2000, value: 'teacher' },
		{ delay: 2000, value: 'all' }
	];
	
	this.init = function(){
		theNavBar = $('nav');
		theLinks = $('a', theNavBar);
		theMarker = $('header .marker');		
		
		theLinks.mouseover( SMNavBar.overLink );
		theLinks.mouseover( stopAnimation );
		theLinks.mouseout( SMNavBar.outLink );
		theLinks.click( SMNavBar.activeLink );

		lastClasses = theMarker.attr('class');
		beginAnimation();
	};

	function beginAnimation(){
		animating = setInterval( animationNextStep, animatingSteps[0].delay );
	}
	function stopAnimation(){
		if(animating) clearInterval(animating);
	}
	function animationNextStep(){
		stopAnimation();
		if(animatingSteps.length < 1) return;
		
		SMNavBar.restoreMarker();
		SMNavBar.updateMarker( animatingSteps[0].value );
		
		animatingSteps.shift(); //elimino al primero
		if(animatingSteps.length) animating = setInterval( animationNextStep, animatingSteps[0].delay );
	}
	
	this.overLink = function(){
		SMNavBar.updateMarker( $(this).attr('class') );
	};
	this.outLink = function(){
		SMNavBar.restoreMarker();
	};
	this.activeLink = function(){
		if( this == btnActive ) return;
		SMNavBar.updateMarker( $(this).attr('class') , true );
		window.location.hash = $(this).attr('href').split('/')[1];
		$(window).trigger('sectionChanged', $(this).attr('href') );
		return false;
	};
	
	this.updateMarker = function( newClass, lock ){
		if( !theMarker ) return;
		
		lastClasses = theMarker.attr('class');
		theMarker.removeClass('all designer developer teacher').addClass( newClass );
		if( lock ) lastClasses = theMarker.attr('class');
	};
	
	this.restoreMarker = function( ){
		theMarker.attr('class', lastClasses);
	};
	
}
$(document).ready( SMNavBar.init );