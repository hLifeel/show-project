var windowWidth = parseInt($(window).width()),
    windowHeight = parseInt($(window).height()),
    screenRatio = windowWidth / windowHeight;
var host = "http://mocsr.69939.uk"; //接口host

function setSize() {
    var maxWidth1 = 1920,
        maxWidth2 = 750,
        fontSize;
    windowWidth = parseInt($(window).width());
    windowHeight = parseInt($(window).height());

    if (windowWidth >= maxWidth1) {
        fontSize = 20;
    } else if (windowWidth > maxWidth2 && windowWidth < maxWidth1) {
        fontSize = ($(window).width() / maxWidth1) * 20;
    } else if (windowWidth <= maxWidth2) {
        fontSize = ($(window).width() / maxWidth2) * 26;
    }
    $("html,body").css({"font-size": fontSize + "px"});
}

function gup(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function popErr(errmsg) {
    var $popErr = $("#popErr");

    $popErr.html(errmsg).fadeIn(500);
    setTimeout(function () {
        $popErr.fadeOut(500);
    }, 1000);
}

/*等宽设置*/
$.fn.setEqualWidth = function (ele) {
    var maxWidth = 0, maxElement = null;
    $(ele).css({
        "width": "auto"
    });
    $(ele).each(function () {
        if (($(this).width() + parseInt($(this).css("padding-left")) + parseInt($(this).css("padding-right"))) > maxWidth) {
            maxWidth = $(this).width() + parseInt($(this).css("padding-left")) + parseInt($(this).css("padding-right"));
            maxElement = this;
        }
    });
    $(ele).not($(maxElement)).each(function () {
        $(this).width(maxWidth - parseInt($(this).css("padding-left")) - parseInt($(this).css("padding-right")))
    });
};
/*导航去链接*/
$.fn.preSelectNav = function (navTxt) {
    setTimeout(function () {
        var t = $("#nav a[title='" + navTxt + "']");

        if (!t.hasClass('hasURL')) {
            t = $("#nav a[title='" + navTxt + "']").attr({
                "href": "javascript:void(0);"
            });
        } else {
            t.attr({
                "href": "javascript:void(0);"
            });
        }
        t.trigger("click");
    }, 500);
};

$(function () {
    function setCss() {
        setSize();
        $('.live_box').css({'width': windowWidth * 0.565, 'height': windowWidth * 0.565 * 610 / 1080})

        $(".heirloom_more_detail").each(function () {
            $("body").setEqualWidth($(".more_detail_item"));
        })
        $(".list_tab").each(function () {
            $("body").setEqualWidth($(".tab_item"));
        })
    }

    $(window).resize(setCss);
    setCss();
    setSize();

    if (!IsPC()) {
        $('.live_box').css({'width': windowWidth * 0.7176, 'height': windowWidth * 0.7176 * 610 / 1080});

        $('.has_sub').click(function () {
            if ($(this).find('.sub_nav').is(':visible')) {
                $(this).removeClass('show_sub');
                $(this).find('.sub_nav').slideUp(300);
                return;
            } else {
                $(this).addClass('show_sub');
                $(this).find('.sub_nav').slideDown(300);
            }
        });
        $('.sub_nav_item').click(function (e) {
            e.stopPropagation();
        });
    } else {
        $('.nav_item').hover(function () {
            $('.sub_nav').hide();
            $(this).find('.sub_nav').show();
        }, function (e) {
            $('.sub_nav').hide();
            $('.nav').removeClass('mobile_nav');
            $('.mobile_nav_bg').removeClass('active');
        });
    }
    $('.mobile_menu').click(function () {
        $('.nav').toggleClass('mobile_nav');
        $('.mobile_nav_bg').toggleClass('active');
        $('body').toggleClass('none_scroll');
    });
    $('.mobile_nav_bg').click(function(){
        $('.nav').removeClass('mobile_nav');
        $('.mobile_nav_bg').removeClass('active');
        $('body').removeClass('none_scroll');
    });

    if ($('.kv_slide').find('.swiper-slide').length > 1) {
        var indexKV = new Swiper('.kv_slide', {
            autoplay: true,//可选选项，自动滑动
            delay: 5000,
            speed: 500,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    /*Tab切换*/
    var tabIndex = 0;
    $('.tab_item').click(function () {
        tabIndex = $(this).index();
        $('.tab_item,.tab_content_item').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.tab_wrap').siblings('.tab_content').find('.tab_content_item').eq(tabIndex).addClass('active');
    });

    if ($('.detail_slide').find('.swiper-slide').length > 1) {
        var detailSlide = new Swiper('.detail_slide', {
            speed: 500,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }


    /*花美男相关物件*/
    var moreItemSlide = {};
    if (IsPC()) {
        moreItemSlide = new Swiper('.more_item_slide', {
            speed: 500,
            loop: true,
            slidesPerView: 3,
            spaceBetween: 20,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    } else {
        moreItemSlide = new Swiper('.more_item_slide', {
            speed: 500,
            loop: true,
            slidesPerView: 3,
            spaceBetween: 10,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    $('.more_item_slide_image').click(function () {
        $('.popup').fadeIn(300);
        $('body').addClass('none_scroll');
        $('.poup_content').niceScroll({
            cursorcolor: "#754E42", // 改变滚动条颜色，使用16进制颜色值
            cursorwidth: "2px",     // 滚动条的宽度，单位：便素
            cursorborderradius: 0, // 滚动条圆角（像素）
        });
    });
    $('.popup').click(function () {
        $(this).fadeOut(300);
        $('body').removeClass('none_scroll');
    });
    $('.poup_content_wrap').click(function (e) {
        e.stopPropagation();
    });
    $('.close').click(function () {
        $(this).parents('.popup').fadeOut(300);
        $('body').removeClass('none_scroll');
    });

    /*遷臺軌跡*/
    $('.milestone_info').click(function () {
        $('.popup').fadeIn(300);
        $('body').addClass('none_scroll');
        $('.poup_content').niceScroll({
            cursorcolor: "#754E42", // 改变滚动条颜色，使用16进制颜色值
            cursorwidth: "2px", // 滚动条的宽度，单位：便素
            cursorborderradius: 0, // 滚动条圆角（像素）
        });
    });
});