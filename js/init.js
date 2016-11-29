
$( document ).ready(function() {

	var 	$body = $('body'),
			$win = $(window),
			win_w = $win.width(),
			win_h = $win.height();

    
	function randNum(min, max) {
	  return Math.random() * (max - min) + min;
	}




	// ==================================
	// INTRO
	//===================================

	var 	$hotspots = $(".hotspot"),
			$intro_dots = $(".dot"),
			xpos,
			ypos;

			
	function setHotspots(){
		xpos = [];
		ypos = [];
		var 	hotspot_xmin = win_w / 7,
				hotspot_ymin = win_h / 4,
				hotspot_ymax = (win_h / 4) * 2;

		$intro_dots.each(function(index, el) {	
			var 	$this = $(this),
					y = randNum(hotspot_ymin, hotspot_ymax),
					xmin = hotspot_xmin * (((index + 1) * 2) - 1),
					xmax = hotspot_xmin * ((index + 1) * 2),
					x = randNum(xmin, xmax);

			xpos.push(x);
			ypos.push(y);

			$this.css({
				left: x,
				top: y,
				'margin-left': -($this.width() / 2),
				'margin-top': -($this.height() / 2)
			}, {
				duration:500,
				queue: false,
				callback: $hotspots.delay(500).fadeIn(500)
			});

		});

		drawHotspotLines();
	}

	


	// Lines between hotspots
	
	var intro_canvas = $('#intro-lines');
	var intro_canvas_context = intro_canvas.get(0).getContext('2d');
	var container = $(window);

	function drawHotspotLines(){
		
		//intro_canvas_context.clearRect(0, 0, 2000, 2000);
		intro_canvas_context.beginPath();
		intro_canvas_context.moveTo(xpos[0], ypos[0]);
		setMidPoints(2, xpos[0], xpos[1]);
		intro_canvas_context.lineTo(xpos[1], ypos[1]);
		setMidPoints(3, xpos[1], xpos[2]);
		intro_canvas_context.lineTo(xpos[2], ypos[2]);
		intro_canvas_context.lineWidth = 4;
		intro_canvas_context.strokeStyle = '#ffffff';
		intro_canvas_context.stroke();
	}

	function setMidPoints(count, start, end){
		var	range = end - start,
				regions = (count * 2) + 1;

		for(i = 0; i < count; i++){
			setPoint(i, range, start, regions);
		}
	}

	function setPoint(index, range, start, regions){
		var	xmin = start + ((range / regions) * (((index + 1) * 2) - 1)),
				xmax = start + ((range / regions) * (((index + 1) * 2))),
				x = randNum(xmin, xmax),
				y = randNum(win_h / 4, (win_h / 4) * 2);

		intro_canvas_context.lineTo(x, y);
	}


	// ==================================
	// page lines
	//===================================
	 var voice_canvas = $('#voice-canvas');
	 var astro_canvas = $('#astro-canvas');
	 var invest_canvas = $('#invest-canvas');
	 var contact_canvas = $('#contact-canvas');

	 function randNum(min, max) {
		  return Math.random() * (max - min) + min;
		}


		var Random_Line = function(canvas, settings, style){
		    // line settings
		    this.canvas = canvas;
		    this.points = settings.points || 6;
		    this.range = settings.range || 200;
		    
		    
		    this.dir = settings.dir || 'horizontal';
		    this.regions = (this.points * 2) + 1;
		  
		    if(this.dir == 'horizontal'){
		      this.x_start = settings.x_start || 0;
		      this.y_start = settings.y_start || randNum(this.range - (this.range / 2), this.range + (this.range / 2));
		      this.x_end = settings.x_end || this.canvas.width();
		      this.y_end = settings.y_end || this.y_start;
		      this.dist = this.x_end - this.x_start;
		      this.region_size = this.dist / this.regions;
		    }else{
		      this.x_start = settings.x_start || randNum(this.range - (this.range / 2), this.range + (this.range / 2));
		      this.y_start = settings.y_start || 0;
		      this.y_end = settings.y_end || this.canvas.height();
		      this.x_end = settings.x_end || this.x_start;
		      this.dist = this.y_end - this.y_start;
		      this.region_size = this.dist / this.regions;
		    }
		    
		    // line style
		    this.line_weight = 4;
		    if(style === undefined){
		    	this.line_color = "#fff";
		    }else{
		    	this.line_color = style.color
		    }
		    

		    this.context = this.canvas.get(0).getContext('2d');
		    
		    this.context.beginPath();
		    
		    if(this.dir == 'horizontal'){
		      this.context.moveTo(this.x_start, this.y_start);
		      
		      for(i = 0; i < this.points; i++){
		        var xmin = this.x_start + (this.region_size * (((i + 1) * 2) - 1)),
		            xmax = this.x_start + (this.region_size * (((i + 1) * 2))),
		            x = randNum(xmin, xmax),
		            y = randNum(this.y_start - (this.range / 2), this.y_start + (this.range / 2));
		        this.context.lineTo(x, y);
		      }
		      if(this.x_end != false){
		        this.context.lineTo(this.x_end, randNum(this.y_start - (this.range / 2), this.y_start + (this.range / 2)));
		      }
		      
		    }else{
		      this.context.moveTo(this.x_start, this.y_start);
		      
		      for(i = 0; i < this.points; i++){
		        var ymin = this.y_start + (this.region_size * (((i + 1) * 2) - 1)),
		            ymax = this.y_start + (this.region_size * (((i + 1) * 2))),
		            y = randNum(ymin, ymax),
		            x = randNum(this.range - (this.range / 2), this.range + (this.range / 2));
		        this.context.lineTo(x, y);
		        this.x_last = x;
		        this.y_last = y;
		      }
		      
		      if(this.y_end == false){
		         this.context.lineTo(randNum(this.range - (this.range / 2), this.range + (this.range / 2)), this.y_end);
		         
		      }
		      
		    }
		    
		    this.context.lineWidth = this.line_weight;
				this.context.strokeStyle = this.line_color;
				this.context.stroke();
				
		}


		//var voice_line_1 = new Random_Line(voice_canvas, {dir: "vert", y_end: false});

		//var voice_line_2 = new Random_Line(voice_canvas, {x_start: voice_line_1.x_last, y_start: voice_line_1.y_last});


	// ==================================
	// PARALLAX
	//===================================
	var 	$intro_bg = $('.intro__background'),
			$scream_1 = $('#scream-1'),
			$scream_2 = $('#scream-2'),
			$gear_1 = $('#gear-1'),
			$gear_2 = $('#gear-2'),
			$astro_1 = $('#astro-1'),
			$astro_2 = $('#astro-2'),
			$astro_3 = $('#astro-3'),
			$info_1 = $('#voice .page__info'),
			$info_2 = $('#invest .page__info'),
			$info_3 = $('#astro .page__info'),
			$info_4 = $('#contact .page__info'),
			
			$container = $('body'),
			container_w = $container.width(),
			container_h = $container.height();

	$(window).on('mousemove.parallax', function(event) {
		var 	pos_x = event.pageX,
				pos_y = event.pageY,
				left  = 0,
				top   = 0,
				speed = 3;

		left = container_w / 2 - pos_x;
		top  = container_h / 2 - pos_y;

		TweenMax.to($intro_bg, speed, { 
			css: { 
				transform: ' translateX(' + left / 40 + 'px) translateY(' + top / 24 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($scream_1, speed, { 
			css: { 
				transform: 'translateX(' + left / 24 + 'px) translateY(' + top / 12 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($scream_2, speed, { 
			css: { 
				transform: 'translateX(' + left / 12 + 'px) translateY(' + top / 6 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($gear_1, speed, { 
			css: { 
				transform: 'translateX(' + left / 24 + 'px) translateY(' + top / 12 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($gear_2, speed, { 
			css: { 
				transform: 'translateX(' + left / 12 + 'px) translateY(' + top / 6 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($astro_1, speed, { 
			css: { 
				transform: 'translateX(' + left / 12 + 'px) translateY(' + top / 6 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($astro_2, speed, { 
			css: { 
				transform: 'rotate(-25deg) translateX(' + left / 12 + 'px) translateY(' + top / 6 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($astro_3, speed, { 
			css: { 
				transform: ' rotate(25deg) translateX(' + left / 20 + 'px) translateY(' + top / 12 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($info_1, speed, { 
			css: { 
				transform: ' translateX(' + left / 40 + 'px) translateY(' + top / 24 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($info_2, speed, { 
			css: { 
				transform: ' translateX(' + left / 40 + 'px) translateY(' + top / 24 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($info_3, speed, { 
			css: { 
				transform: ' translateX(' + left / 40 + 'px) translateY(' + top / 24 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

		TweenMax.to($info_4, speed, { 
			css: { 
				transform: ' translateX(' + left / 40 + 'px) translateY(' + top / 24 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
		});

	});




	// ==================================
	// PAGE
	//===================================
	
	var	$pages = $('.page'),
			$close = $('.close-btn'),
			$logo = $('#logo'),
			page_fade_speed = 300;

	$hotspots.on("click", function(event) {	
		event.preventDefault();
		hidePage();

		var 	index = $(this).data('index'),
				$page = $('[data-hotspot="' + index + '"]');

		if(index == 1 || index == 0 || index == 3){
			$logo.removeClass('logo__invert')
			$logo.addClass('logo')
		}else{
			$logo.addClass('logo__invert')
			$logo.removeClass('logo')
		}

		if(index == 3 || index == 1){
			$('.close').css({'fill' : "#cd2127"}, 300)
		}else{
			$('.close').css({'fill' : "#fff"}, 300)
		}

		showPage($page);

		return false;
	});

	$close.on('click', function(event) {
		event.preventDefault();
		
		hidePage();
	});


	function hidePage(){
		$logo.addClass('logo__invert')
		$logo.removeClass('logo')
		$pages.fadeOut(page_fade_speed);
		$close.fadeOut(page_fade_speed);
	}

	function showPage($page){
		$page.fadeIn(page_fade_speed);
		$close.fadeIn(page_fade_speed);
		//drawHotspotLines();
		setCanvas();
		setLines()
	}

	$close.hide();


	// ==================================
	// RESIZE
	//===================================
	




	// ==================================
	// RESIZE
	//===================================
	

	function respondCanvas(c){ 

		c.attr('width', $(container).width() );
		c.attr('height', $(container).height() );
		c.get(0).getContext('2d').clearRect(0, 0, $(container).width(), $(container).height())
		
	}

	function setLines(){
		drawHotspotLines();
		voice_line_1 = new Random_Line(voice_canvas, {dir: "vert", y_end: false});
		voice_line_2 = new Random_Line(voice_canvas, {x_start: voice_line_1.x_last, y_start: voice_line_1.y_last});

		invest_line_1 = new Random_Line(invest_canvas, {dir: "vert", y_end: false});
		invest_line_2 = new Random_Line(invest_canvas, {x_start: invest_line_1.x_last, y_start: invest_line_1.y_last});

		astro_line_1 = new Random_Line(astro_canvas, {dir: "vert", y_end: false}, {color: "#cd2127"});
		astro_line_2 = new Random_Line(astro_canvas, {x_start: astro_line_1.x_last, y_start: astro_line_1.y_last}, {color: "#cd2127"});

		contact_line_1 = new Random_Line(contact_canvas, {dir: "vert", y_end: false}, {color: "#cd2127"});
		contact_line_2 = new Random_Line(contact_canvas, {x_start: contact_line_1.x_last, y_start: contact_line_1.y_last}, {color: "#cd2127"});
	}

	function setCanvas(){
		respondCanvas(intro_canvas)
		respondCanvas(voice_canvas)
		respondCanvas(astro_canvas)
		respondCanvas(invest_canvas)
		respondCanvas(contact_canvas)

	}

	$win.resize(function(event) {
		win_w = $win.width(),
		win_h = $win.height();

		setHotspots()
		setCanvas()
		//drawHotspotLines();
		setLines()
		check_mobile()
	});

	function check_mobile(){
		
	}
	$('#intro').show();
	setHotspots()
	setCanvas()
	//drawHotspotLines();
	setLines()
	

	//$('#intro').show();

});
