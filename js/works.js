SMWorks = new function(){
	
	var works = null;
	
	this.init = function(){
		works = $('#work').isotope({
	    	  // options
	    	  itemSelector : 'article',
	    	  //masonryHorizonatl : { rowHeight: 300 },
	    		  
	    	  getSortData : {
	    		    designer : function ( elem ) {
	    		    	$elem = $(elem);
	    		        var value = 0;
	    		    	if( $elem.hasClass('developer') || $elem.hasClass('teacher') ) value = 1;
	    		    	return value;
	    		    },
	    		    developer : function ( elem ) {
	    		    	$elem = $(elem);
	    		    	var value = 0;
	    		    	if( $elem.hasClass('designer') || $elem.hasClass('teacher') ) value = 1;
	    		    	return value;
	    		    },
	    		    teacher : function ( elem ) {
	    		    	$elem = $(elem);
	    		    	var value = 0;
	    		    	if( $elem.hasClass('designer') || $elem.hasClass('developer') ) value = 1;
	    		    	return value;
	    		    },
	    		    title: function ( elem ){
	    		    	$elem = $(elem);
	    		    	return $elem.find('h2').text();
	    		    }
	    		  }
	    	});
		
		
		$("#work article img").css('opacity', 0);
		$("#work article img").parent().prepend( '<div class="loading"></div>​' );
		/*
		$("#work li .loading").css('margin-left', '20px');
		$("#work li .loading").cSpinner({
		    color: "rgba(200, 200, 200, 0.75)",
		    scale: 3, 
		    lineWidth: 2,
		    innerRadius: 4,
		    outerRadius: 7,
		    segments: 10,
		    lineCap: "round"
		});
		*/
		$(window).load( function(){ 
			$("#work article .loading").remove();
			$("#work article img").animate( { 'opacity': 1 }, 1000 );
			works.isotope('layout'); 
		} );
		$(window).bind('sectionChanged', SMWorks.refreshWorks );
		$("#work article").mouseover( SMWorks.updateMarker );
		$("#work article").mouseout( SMWorks.resetMarker );

		$('a.detail').click( function(){ 
			var article = $(this).closest('article');
			SMWorks.loadWork( $(this), article );
		})

		if( window.location.hash ){
			//jQuery da error al buscar #!
			var hack = window.location.hash.replace('#!', '');
			$('a[href*='+hack+']').click();
		}

	};
	
	this.updateMarker = function(){
		var el = $(this);
		var css = '';
		if( el.hasClass('teacher') ){
			css = 'teacher';
		} else if ( el.hasClass('designer') ){
			css = 'designer';	
			if( el.hasClass('developer') ){
				css += ' developer';
			}
		} else if( el.hasClass('developer') ){
			css = 'developer';
		}
		SMNavBar.updateMarker( css );
	};
	
	this.resetMarker = function(){
		SMNavBar.restoreMarker();
	};
	
	this.refreshWorks = function(event, section ){
		var selector = '';
		var sorter = '';
		switch(section){
			case './':
			selector = '*';
			sorter = 'original-data'
			break;
			
			case '/teacher':
			case '/designer':
			case '/developer':
			selector = section.replace('/', '.');
			sorter = selector.slice(1);
			break;
		}
		works.isotope( {
			filter: selector,
			sortBy: sorter
		} );
	};

	this.loadWork = function(anchor, article){
		SMWorks.unloadWork();
		var href = anchor.attr('href');
		var snippet = href.replace('#!', '');
		$.ajax({
			url: '',
			data: {
				"_escaped_fragment_": snippet,
				"ajax": true
			},
			success: function(data){
				$(article).addClass('detail').animate({ width: '530px', height: '335px' }, 500, function(){ 
					$(article).append(data);
					$('.workDetail', article).hide().fadeIn(1000);
					$('.workDetail .close', article).click( SMWorks.unloadWork );
					works.isotope('layout');

					var slides = $('.slide', article);
					var nSlide = 0;
					function nextSlide(){
						slides.hide();
						$(slides[nSlide]).fadeIn(500);
						nSlide++;
						console.log(nSlide, slides.length);

						if( nSlide >= slides.length ) nSlide = 0;
					}
					if( slides.length > 1 ){
						var interval = setInterval( nextSlide, 3000);
						nextSlide();
						article.attr('data-interval', interval);
					}
					
				})
			}
		});		
	}

	this.unloadWork = function(){
		var article = $('.bullet.detail');
		clearInterval( article.attr('data-interval') )
		$('.workDetail', article).fadeOut(1000, function(){
			$(this).remove();
			article
				.removeClass('detail')
				.animate({ 
					width: '230px', 
					height: '60px' 
				}, 
				500, 
				function(){ 
					works.isotope('layout') 
				})
		});
	}
	
};

$(document).ready( SMWorks.init );