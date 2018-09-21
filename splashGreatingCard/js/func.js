function set_size() {
    $("html").css({"font-size": $(window).width() >= 750 ? 28: ($(window).width() / 750 * 28)})
}
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        window.clearTimeout(id);
    };
}());

$(function(){
    var touchX,
        touchendX;
    set_size();

    setTimeout(function(){
        $('#curtain').css(set_animation('dropDown 1s ease-out forwards'));
        $('#footer_img').css(set_animation('dropUp 1s ease-out forwards'));
        setTimeout(function(){
            $('.pop_img').show();
            $('#pop_img1').css(set_animation('dropUp 0.1s ease-in forwards'));
            setTimeout(function(){
                $('#pop_img2').css(set_animation('dropUp 0.1s ease-in forwards'));
                setTimeout(function(){
                    $('#pop_img3').css(set_animation('dropUp 0.1s ease-in forwards'));
                    setTimeout(function(){
                        $('#pop_img4').css(set_animation('dropUp 0.1s ease-in forwards'));
                        setTimeout(function(){
                            $('#pop_img5').css(set_animation('dropUp 0.1s ease-in forwards'));
                            setTimeout(function(){
                                $('#cong_txt').css(set_animation('iconframe 0.5s ease-in forwards'));
                            },300);
                        },100);
                    },100);
                },100);
            },100);
        },1200);

        $('#result').css(set_animation('iconframe 0.5s ease-in forwards'));
    },200);

    function set_animation(animation) {
        return {
            '-webkit-animation': animation,
            '-moz-animation': animation,
            '-o-animation': animation,
            '-ms-animation': animation,
            'animation': animation
        }
    }

    $('.gift_hodler a').attr('onclick','return false');
    setTimeout(function(){
        $('.gift_hodler a').removeAttr('onclick');
    },2000);

    $('#cover_lay').on({
        click:function(){
            $(this).fadeOut(300);
        },
        touchstart: function (event) {
            $(this).fadeOut(300);
        },
        touchmove: function (event) {
            $(this).fadeOut(300);
        },
        touchend: function () {
            $(this).fadeOut(300);
        }
    });
    $('#guide_show').click(function(){
        $('#result_cover_lay').fadeIn(300);
    });
    $('#result_cover_lay').click(function(){
        $(this).fadeOut(300);
    });

});