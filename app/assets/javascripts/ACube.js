var cubearray=new Array("cube/cubo0000.png", "cube/cubo0001.png", "cube/cubo0002.png", "cube/cubo0003.png", "cube/cubo0004.png", "cube/cubo0005.png", "cube/cubo0006.png", "cube/cubo0007.png", "cube/cubo0008.png", "cube/cubo0009.png", "cube/cubo0010.png", "cube/cubo0011.png", "cube/cubo0012.png",  "cube/cubo0013.png" ,  "cube/cubo0014.png",  "cube/cubo0015.png" , "cube/cubo0016.png","cube/cubo0017.png", "cube/cubo0018.png", "cube/cubo0019.png", "cube/cubo0020.png")
var animationended;
var timer;

$(document).ready(function() 
{
  	
	if(navigator.userAgent.toUpperCase().indexOf('MSIE 10')!=-1)
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="css/ie.css">');
	}	
  	animages.create({containerid:'cubecontainer', array:cubearray, type:"bg", arrLoadCallback:imagesloaded, endAnimationCallback:endanimation});
  	hideButtons();



  	$('.falsecheck').click(function(e)
  	{
  		$(this).toggleClass('checked');
  		
  		if($('#adsllink').hasClass('checked'))
  		{
  			$('#masinfoadsl').css({'display': 'block'});
  		}else
  		{
  			$('#masinfoadsl').css({'display': 'none'});
  		}

  		if($('#movillink').hasClass('checked'))
  		{
  			//$('#masinfomovil').css({'display': 'block'});
  			$('#masinfoadsl').css({'display': 'block'});
  		}else
  		{
  			//$('#masinfomovil').css({'display': 'none'});
  			$('#masinfoadsl').css({'display': 'block'});
  		}

  		if($('#movillink').hasClass('checked') && $('#adsllink').hasClass('checked'))
  		{
  			//$('#masinfomovil').css({'display': 'none'});
  			$('#masinfoadsl').css({'display': 'block'});
  		}

  		if($('#movillink').hasClass('checked')==false && $('#adsllink').hasClass('checked')==false)
  		{
  			//$('#masinfomovil').css({'display': 'none'});
  			$('#masinfoadsl').css({'display': 'none'});
  		}
  		return false;	

  	})
});



function imagesloaded()
{
	init();
	
	$('#loader').css({'display':'none'});
	$('#cubecontainer').css({'display':'block'});
	animages.fromTo('cubecontainer',6,0,30, false);

	

	$('#cubecontainer').animate(
	{
    	top: '115',
    	opacity:1
  	}, 500);
	
	//desde generico
	$('#overmovil00').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',12,16,20, false);
		animationended="generictomovil";
		hideButtons();
	});

	$('#overfijo00').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',16,21,20, false);
		animationended="genericotofijo";
		hideButtons();
	});

	$('#overadsl00').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',0,3,20, false);
		animationended="genericotoadsl";
		hideButtons();
	});

	//desde adsl
	$('#overfijo02').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',11,8,20, false);
		animationended="adsltofijo";
		hideButtons();
	});

	$('#overmovil02').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',2,6,20, false);
		animationended="adsltomovil";
		hideButtons();
	});

	//desdemovil
	$('#overfijo01').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',6,9,20, false);
		animationended="moviltofijo";
		hideButtons();
	});
	$('#overadsl01').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',5,2,20, false);
		animationended="moviltoadsl";
		hideButtons();
	});


	//desde fijo
	$('#overmovil01').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',8,5,20, false);
		animationended="fijotomovil";
		hideButtons();
	});
	$('#overadsl02').bind("mouseover focus", function()
	{
		animages.fromTo('cubecontainer',8,12,20, false);
		animationended="fijotoadsl";
		hideButtons();
	});


	$('#cubecontainer').mouseout(function()
	{
		clearTimeout(timer);
		timer=setTimeout(togeneric,5000);
	});
	

}



function hideButtons()
{
	clearTimeout(timer);
	$('#overmovil00').hide();
	$('#overmovil01').hide();
	$('#overmovil02').hide();
	$('#overadsl00').hide();
	$('#overfijo00').hide();
	$('#overadsl01').hide();
	$('#overadsl02').hide();
	$('#overfijo01').hide();
	$('#overfijo02').hide();
}

function init()
{
	$('#overmovil00').show();
	$('#overfijo00').show();
	$('#overadsl00').show();
	$('#overadsl00').show();

	$('.detalles .generico').animate({marginTop: '0'}, 500);
}


function endanimation()
{
	switch(animationended)
	{
		case "generictomovil":
			$('.detalles .generico').animate({marginTop: '-28em'}, 500);
			$('#overadsl01').show();
			$('#overfijo01').show();
		break;
		case "genericotofijo":
		$('.detalles .generico').animate({marginTop: '-42em'}, 500);
		$('#overadsl02').show();
		$('#overmovil01').show();
		break;
		case "genericotoadsl":
		$('.detalles .generico').animate({marginTop: '-14em'}, 500);
		$('#overmovil02').show();
		$('#overfijo02').show();
		break;
		case "adsltofijo":
		$('.detalles .generico').animate({marginTop: '-42em'}, 500);
		$('#overmovil01').show();
		$('#overadsl02').show();
		break;
		case "adsltomovil":
		$('.detalles .generico').animate({marginTop: '-28em'}, 500);
		$('#overfijo01').show();
		$('#overadsl01').show();
		break;
		case "moviltofijo":
			$('.detalles .generico').animate({marginTop: '-42em'}, 500);
			$('#overadsl02').show();
			$('#overmovil01').show();
		break;
		case "moviltoadsl":
			$('.detalles .generico').animate({marginTop: '-14em'}, 500);
			$('#overmovil02').show();
			$('#overfijo02').show();
		break;
		case "fijotomovil":
			$('.detalles .generico').animate({marginTop: '-28em'}, 500);
			$('#overfijo01').show();
			$('#overadsl01').show();
		break;
		case "fijotoadsl":
			$('.detalles .generico').animate({marginTop: '-14em'}, 500);
			$('#overmovil02').show();
			$('#overfijo02').show();
		break;
	}
	
}

function togeneric()
{
		

	if(animationended=="generictomovil" || animationended=="adsltomovil" || animationended=="fijotomovil")
	{
		animages.fromTo('cubecontainer',15,12,20, false);
		hideButtons();
		init();
	}

	if(animationended=="genericotofijo" || animationended=="adsltofijo" || animationended=="moviltofijo")
	{
		animages.fromTo('cubecontainer',20,16,20, false);
		hideButtons();
		init();
	}

	if(animationended=="genericotoadsl" || animationended=="moviltoadsl" || animationended=="fijotoadsl")
	{
		animages.fromTo('cubecontainer',2,0,20, false);
		hideButtons();
		init();
	}
	animationended="togeneric";




}


function llamaSiteCat(pageName){
	/* You may give each page an identifying name, server, and channel on
		the next lines. */
		//var s = s_gi(s_account);
		s.account="vodafoneesglobal, vodafoneespar";
		s.channel="Particulares";
		s.pageName	= pageName;
		/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
		var s_code=s.t();if(s_code) document.write(s_code)//-->

};