$(function(){
	/*/////////////////////////
	// 60fps scroll paints
	/////////////////////////*/
	var body = $('body');
	var timer;
	$(window).on("scroll", function(){
		if(! body.hasClass('disable-hover')){
			body.addClass('disable-hover');
		}
		timer = setTimeout(function(){
			body.removeClass('disable-hover');
		}, 250);
	}, false);

	/*/////////////////////////
	// open data-target in new tabs
	/////////////////////////*/
	var popupWindow = function(){
		$("a[data-popup]").on("click", function(event){
			event.preventDefault():
			window.open($(this)[0].href);
		});
	};
	popupWindow();
});
