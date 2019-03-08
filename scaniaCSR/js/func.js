function set_size() {
    $("html").css({"font-size": $(window).width() >= 750 ? 21 : ($(window).width() / 750 * 18)});
}

$(window).resize(set_size);

$(function () {
    set_size();
});

/*Vue Code*/
(function () {
    var tabSection = new Vue({
        el: '#tabSection',
        data: {
            activeKey: '1',
            class: ['tab1', 'tab2', 'tab3'],
            btnInfo: [
                {
                    index: 0,
                    txt: '基础版'
                },
                {
                    index: 1,
                    txt: '升级版'
                }
            ],
            selectIndex: 0
        },
        methods: {
            setCls: function () {
                return this.class[Number(this.activeKey)];
            },
            btnCls(index) {
                return {
                    'active': this.selectIndex == index
                }
            },
            changeBtn(index) {
                this.selectIndex = index;
                $('.slideArea').removeClass('active').eq(index).addClass('active');
            }
        },
        mounted: function () {
            $('.tabs-tab').eq(0).hide();
            //切换语言
            $('.chooseLang').click(function () {
                $('.droplist').slideToggle('fast');
            });
            //手册轮播
            (function () {
                var slideArray = new Array(),
                    slideWindow = $('.slideWindow'),
                    slideWrap = $('.slideWrap'),
                    previewWrap = $('.previewWrap'),
                    slideWindowWidth = $('.handbookContent').width(),
                    slideLocation = 0,
                    touchX,
                    touchendX,
                    size = $(window).width() >= 750 ? 21 : ($(window).width() / 750 * 18),
                    previewItemWidth = 8.5,
                    previewItemMargin = 2,
                    previewWrapRatio = 0.9;

                //定义Slide对象
                var Slide = function (bannerWidth, animateDuration, bannerIndex, slideWrap, count, isSlide, previewWrap) {
                    this.bannerWidth = bannerWidth;
                    this.animateDuration = animateDuration;
                    this.bannerIndex = bannerIndex;
                    this.slideWrap = slideWrap;
                    this.count = count;
                    this.isSlide = isSlide;
                    this.previewWrap = previewWrap;
                };
                Slide.prototype = {
                    pointClick: function (pointIndex) {
                        this.bannerIndex = pointIndex;
                        this.slide();
                    },
                    //左箭头点击
                    doLeft: function () {
                        if (this.isSlide) return;
                        --this.bannerIndex;
                        if (this.bannerIndex <= 0) {
                            this.bannerIndex = 0;
                        }
                        this.slide();
                    },
                    //右箭头点击
                    doRight: function () {
                        if (this.isSlide) return;
                        ++this.bannerIndex;
                        if (this.bannerIndex >= this.count - 1) {
                            this.bannerIndex = this.count - 1;
                        }
                        this.slide();
                    },
                    slide: function () {
                        if (this.isSlide) return;
                        this.isSlide = true;
                        var _this = this;

                        this.slideWrap.stop(true, true).animate({
                                'margin-left': _this.bannerIndex * -_this.bannerWidth
                            }, _this.animateDuration,
                            function () {
                                _this.isSlide = false;
                            }
                        );

                        this.previewWrap.find('.previewItem').removeClass('isSelected').eq(this.bannerIndex > this.count - 1 ? this.count - 1 : this.bannerIndex).addClass("isSelected");
                        var barSize = ((this.bannerIndex + 1) * previewItemWidth + this.bannerIndex * previewItemMargin)* size;

                        console.log()

                        if (barSize >= this.bannerWidth * previewWrapRatio) {
                            this.previewWrap.stop(true, true).animate({
                                'margin-left': _this.bannerWidth * previewWrapRatio - barSize
                            }, _this.animateDuration);
                        } else {
                            this.previewWrap.stop(true, true).animate({
                                'margin-left': 0
                            }, _this.animateDuration);
                        }
                    }
                };

                (function () {
                    for (var i = 0; i < slideWindow.length; i++) {
                        slideWindow.eq(i).addClass('slideWindow' + i).attr('data-index', i);
                        slideWrap.eq(i).addClass('slideWrap' + i);
                        previewWrap.eq(i).addClass('previewWrap' + i);

                        var slideItem = new Slide(slideWindowWidth, 500, 0, $('.slideWrap' + i), $('.slideWrap' + i + '>img').length, false, $('.previewWrap' + i));

                        slideArray.push(slideItem);

                        //根据轮播图数量添加焦点
                        for (var n = 0; n < slideArray[i].count; n++) {
                            $('.previewWrap' + i).append('<div class="previewItem" data-point="' + n + '">' +
                                '<img src="' + slideWindow.eq(i).find('.detailInfo').eq(n).attr('src') + '" alt="">\n' +
                                '<div class="itemCover"></div>' +
                                '</div>')
                        }
                        $('.previewWrap' + i + '>div').eq(0).addClass('isSelected').css('margin-left', 0);

                        setBasicData(i);
                    }
                }());
                $(window).resize(function () {
                    for (var i = 0; i < slideWindow.length; i++) {
                        slideArray[i].bannerWidth = $('.slideWindow' + i).width();
                        setBasicData(i);
                    }
                });

                //设置轮播区域宽度
                function setBasicData(index) {
                    slideWrap.eq(index).css('width', slideArray[index].bannerWidth * slideArray[index].count);
                    slideWrap.eq(index).find(".detailInfo").css('width', slideArray[index].bannerWidth);
                    previewWrap.eq(index).css('width', size * (previewItemWidth * slideArray[index].count + previewItemMargin * (slideArray[index].count - 1)));
                }

                $('.doLeft').click(function () {
                    slideLocation = $(this).parents('.previewBar').siblings('.slideWindow').attr('data-index');
                    slideArray[slideLocation].doLeft();
                });
                $('.doRight').click(function () {
                    slideLocation = $(this).parents('.previewBar').siblings('.slideWindow').attr('data-index');
                    slideArray[slideLocation].doRight();
                });
                $('.previewWrap>div').click(function () {
                    var pointIndex = Number($(this).attr('data-point'));
                    //console.log(pointIndex);
                    slideLocation = $(this).parents('.previewBar').siblings('.slideWindow').attr('data-index');
                    slideArray[slideLocation].pointClick(pointIndex);
                });
                //手机滑屏
                $('.slideArea').on({
                    touchstart: function () {
                        touchX = touchendX = Number(event.touches[0].clientX);
                    },
                    touchmove: function () {
                        event.preventDefault();
                        touchendX = Number(event.touches[0].clientX);
                    },
                    touchend: function () {
                        var moveDistance = touchX - touchendX;
                        slideLocation = $(this).find('.slideWindow').attr('data-index');
                        if (moveDistance < -45) {
                            if (slideArray[slideLocation].isSlide) return;
                            --slideArray[slideLocation].bannerIndex;
                            if (slideArray[slideLocation].bannerIndex <= 0) {
                                slideArray[slideLocation].bannerIndex = 0;
                            }
                            slideArray[slideLocation].slide();
                        } else if (moveDistance > 45) {
                            if (slideArray[slideLocation].isSlide) return;
                            ++slideArray[slideLocation].bannerIndex;
                            if (slideArray[slideLocation].bannerIndex >= slideArray[slideLocation].count - 1) {
                                slideArray[slideLocation].bannerIndex = slideArray[slideLocation].count - 1;
                            }
                            slideArray[slideLocation].slide();
                        }
                    }
                });
            }());
        }
    });
}());