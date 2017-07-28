$(document).ready(function(){
	var $form = $('form');
	$form.submit(function(){
    	$.get($(this).attr('action'), $(this).serialize(), function(data){

	            if (data.htmlVersion == undefined){
    				$('#error-span').empty().append('<h3>'+data.error+'</h3>');
    			} else{
    				$('#error-span').empty();
		            $('#htmlVersion').empty().append('<p>'+data.htmlVersion+'</p>');
		            $('#title').empty().append('<p>'+data.title+'</p>');
		            $('#headings').empty().append('<p>'+data.headings+'</p>');
		            $('#h1').empty().append('<p>'+data.h1+'</p>');
		            $('#h2').empty().append('<p>'+data.h2+'</p>');
		            $('#h3').empty().append('<p>'+data.h3+'</p>');
		            $('#h4').empty().append('<p>'+data.h4+'</p>');
		            $('#h5').empty().append('<p>'+data.h5+'</p>');
		            $('#h6').empty().append('<p>'+data.h6+'</p>');
		            $('#links').empty().append('<p>'+data.links+'</p>');
		            $('#internalLinks').empty().append('<p>'+data.internalLinks+'</p>');
		            $('#emptyLinks').empty().append('<p>'+data.emptyLinks+'</p>');
		            $('#loginForm').empty().append('<p>'+data.loginForm+'</p>');
	        }
      },'json');
      return false;
   });
});