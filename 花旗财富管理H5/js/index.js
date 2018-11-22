//var openMusic = true;
///*字体大小*/
//(function(doc, win) {
//	var docEl = doc.documentElement,
//		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//		recalc = function() {
//			var clientWidth = docEl.clientWidth;
//			if(!clientWidth) return;
//			if(clientWidth>760){
//				docEl.style.fontSize = 100 * (clientWidth / 768) + 'px';
//			}else{
//				docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
//			}
//		};
//
//	if(!doc.addEventListener) return;
//	win.addEventListener(resizeEvt, recalc, false);
//	doc.addEventListener('DOMContentLoaded', recalc, false);
//})(document, window);


/*分屏*/
$(function(){
	$('#dowebok').fullpage({
		sectionsColor: ['#fff'],
		afterLoad: function(anchorLink, index){
			var index = parseInt(index) + 0;
			$('.section'+index+' .p_mask').css('display','none');
			
			var section = '.section'+index+' .animated';
			var animaArr = $(section);
			for(var i=0;i<animaArr.length;i++){
				var _animaName = animaArr[i].id;
				var animaName = _animaName.split("_")[1];
				$(animaArr[i]).addClass(animaName);
				$(animaArr[i]).removeClass('none_op');
			}
			
			
		},
		onLeave: function(index, direction){
			var index = parseInt(index) + 0;
			var section = '.section'+index+' .animated';
			var animaArr = $(section);
			for(var i=0;i<animaArr.length;i++){
				var _animaName = animaArr[i].id;
				var animaName = _animaName.split("_")[1];
				$(animaArr[i]).removeClass(animaName);
				$(animaArr[i]).addClass('none_op');
			}
			$('.section'+index+' .p_mask').css('display','block');
			
		},
//		loopTop:true,//滚动到最顶部后是否连续滚动到底部，默认为false。
//      loopBottom:true,//滚动到最底部后是否连续滚动回顶部，默认为false，
//      continuousVertical:true,
        animateAnchor:false,
        scrollingSpeed:0,
	});
});
