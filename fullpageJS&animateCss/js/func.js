function set_size() {
    $("html").css({"font-size": $(window).width() >= 750 ? 24 : ($(window).width() / 750 * 24)})
}

$(function () {
    set_size();
    setTimeout(function () {
        window.location.hash='section1';
    },100);

    var animaArr = $('.section1 .animated');
    for (var i = 0; i < animaArr.length; i++) {
        var _animaName = animaArr[i].id;
        var animaName = _animaName.split("_")[1];
        $(animaArr[i]).addClass(animaName);
    }

    $('#layout').fullpage({
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        anchors:['section1','section2','section3'],
        verticalCentered: false,
        animateAnchor: false,
        lockAnchors: true,
        afterLoad: function (origin, destination, direction) {
            /*console.log(destination);*/
            var Index = destination.index + 1,
                sectionAnimated = '.section' + Index + ' .animated',
                animateArray = $(sectionAnimated);
            for (var i = 0; i < animateArray.length; i++) {
                var _animateName = animateArray[i].id,
                    animateName = _animateName.split("_")[1];
                $(animateArray[i]).addClass(animateName).removeClass('visibleHide');
            }
        },
        onLeave :function(origin,destination,direction){
            //console.log(destination);
            var Index=destination.index+1,
                sectionAnimated='.section'+Index+' .animated',
                animateArray=$(sectionAnimated);
            if(Index>2){
                $('.page_arrow,.arrowTip').hide();
            }else{
                $('.page_arrow,.arrowTip').show();
            }
            for (var i=0;i<animateArray.length;i++){
                var _animateName=animateArray[i].id,
                    animateName = _animateName.split("_")[1];
                $(animateArray[i]).removeClass(animateName).addClass('visibleHide');
            }
        }
    });

});