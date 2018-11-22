function set_size() {
    $('html').css({'font-size':$(window).width()>=640?14:($(window).width()/640*22)})
}
$(window).resize(set_size);

$.fn.setEqualHeight = function (ele) {
    var maxHeight = 0, maxElement = null;
    $(ele).css({
        "height": "auto"
    });
    $(ele).each(function () {
        if (($(this).height() + parseInt($(this).css("padding-bottom")) + parseInt($(this).css("padding-top"))) > maxHeight) {
            maxHeight = $(this).height() + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom"));
            maxElement = this;
        }
    });
    $(ele).not($(maxElement)).each(function () {
        $(this).height(maxHeight - parseInt($(this).css("padding-top")) - parseInt($(this).css("padding-bottom")))
    });
};
function closePopup(id) {
    $('#' + id).hide();
}
function openPopup(id) {
    $('#' + id).fadeIn();
}

$(function () {
    set_size();

    var swiper1=new Swiper('#swiper1',{
        roundLengths : true,
        slidesPerView : 3,
        slidesPerGroup : 3,
        spaceBetween : 14,
        allowTouchMove: false,
        breakpoints: {
            //当宽度小于等于640
            640: {
                spaceBetween : 10,
                slidesPerView: 2,
                slidesPerGroup : 2
            }
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
    });
    var swiper2=new Swiper('#swiper2',{
        roundLengths : true,
        slidesPerView : 3,
        slidesPerGroup : 3,
        spaceBetween : 14,
        allowTouchMove: false,
        breakpoints: {
            //当宽度小于等于640
            640: {
                spaceBetween : 10,
                slidesPerView: 2,
                slidesPerGroup : 2
            }
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
    });

    $(".swiper-container").each(function () {
        $("body").setEqualHeight($(".eventTitle", this));
        $("body").setEqualHeight($(".eventTime", this));
    })

    var eventList=[
        {
            event:'上海场（第一场）',
            title:'留学申请 大有可为',
            time:'11月24日（周六） 下午14:00 – 16:00',
            location:'花旗银行上海分行（上海市浦东陆家嘴金融贸易区 花园石桥路33号花旗集团大厦1楼）',
            content:[
                '如何选择留学目的地、学校、专业？',
                '留学前需要哪些专业培训？留学申请必须知道的tips？',
                '留学面试有何“面经”？',
                '留学不菲的教育和生活开支，如何提前规划？'
            ],
            guest:'章淼  芝加哥大学毕业生<br>' +
            '骥宇 帝国理工学院毕业生<br>' +
            'Vera Hao 英孚国际留学备考上海浦东中心校长<br>' +
            '朱琛 花旗银行财富策划经理',
            backgroundImg:'images/eventPopupSH.png'
        },
        {
            event:'广州场',
            title:'留学申请 大有可为',
            time:'12月1日（周六） 下午13:00 – 15:00',
            location:'花旗银行广州财富广场支行（广州市天河区体育东路118号 财富广场101单元）',
            content:[
                '如何选择留学目的地、学校、专业？',
                '留学前需要哪些专业培训？留学申请必须知道的tips？',
                '留学面试有何“面经”？',
                '留学不菲的教育和生活开支，如何提前规划？'
            ],
            guest:'田力  哥伦比亚大学毕业生<br>' +
            '徐凤茜 布兰迪斯大学毕业生<br>' +
            'Candy Chen 英孚国际留学备考广州中心校长<br>' +
            '欧庆君 花旗银行财富策划经理',
            backgroundImg:'images/eventPopupGZ.png'
        },
        {
            event:'深圳场',
            title:'留学申请 大有可为',
            time:'12月1日（周六）下午13:00 – 15:00',
            location:'花旗银行深圳福田支行（深圳市福田区福华一路6号免税商务大厦商业裙楼105单元）',
            content:[
                '如何选择留学目的地、学校、专业？',
                '留学前需要哪些专业培训？留学申请必须知道的tips？',
                '留学面试有何“面经”？',
                '留学不菲的教育和生活开支，如何提前规划？'
            ],
            guest:'武皓彧  上海纽约大学毕业生<br>' +
            '蔡思颖 伦敦商学院毕业生<br>' +
            'Nivi Fu 英孚国际留学备考深圳中心校长<br>' +
            '白莹 花旗银行财富策划经理',
            backgroundImg:'images/eventPopupSZ.png'
        },
        {
            event:'成都场',
            title:'从故乡到他乡-留学生如何融入异国生活',
            time:'12月8日（周六）下午15:00 – 17:00',
            location:'花旗银行成都丰德国际广场支行（成都市武侯区航空路6号附4号-5号1楼）',
            content:[
                '孩子出国前要做哪些准备？',
                '刚到国外遇到的困难，如何克服？',
                '业余生活如何安排？',
                '如何在国外找实习？'
            ],
            guest:'姚怀晰  明尼苏达大学毕业生<br>' +
            '徐梦哲 华威大学毕业生<br>' +
            '李希 英孚国际留学备考全国总监 (TBD) ',
            backgroundImg:'images/eventPopupCD.png'
        },
        {
            event:'杭州场',
            title:'从故乡到他乡-留学生如何融入异国生活',
            time:'12月8日（周六）下午14:00 – 16:00',
            location:'花旗银行杭州黄龙支行（杭州市杭大路15号 嘉华国际商务中心一层）',
            content:[
                '孩子出国前要做哪些准备？',
                '刚到国外遇到的困难，如何克服？',
                '业余生活如何安排？',
                '如何在国外找实习？'
            ],
            guest:'武皓彧  上海纽约大学毕业生<br>' +
            '高文凯 博科尼大学毕业生<br>' +
            '江灿 花旗银行市场部 杜克大学毕业生 ',
            backgroundImg:'images/eventPopupHZ.png'
        },
        {
            event:'上海场（第二场）',
            title:'留学你必须知道的安全tips',
            time:'12月15日（周六）下午14:00 – 16:00',
            location:'花旗银行上海南京西路支行（上海市南京西路762号1楼A 室和2楼）',
            content:[
                '国外留学生活存在的危险有哪些？',
                '如何最大程度地远离留学生活的可能出现的不安全因素？',
                '出国前需要做哪些必要准备规避风险？'
            ],
            guest:'章淼  芝加哥大学毕业生<br>' +
            '徐凤茜 布兰迪斯大学毕业生<br>' +
            '江灿 花旗银行市场部 杜克大学毕业生 ',
            backgroundImg:'images/eventPopupSH.png'
        },
        {
            event:'北京场（第一场）',
            title:'海归的“选择题”- 国外还是回国？',
            time:'12月15日（周六）上午10:00 -12:00',
            location:'花旗银行北京分行（北京市西城区武定侯街6号卓著中心十八层会议室）',
            content:[
                '海外求职如何准备？国外工作需要考虑的问题？',
                '回国求职可能遇到的困难？该如何准备？',
                '海归如何在职场上展现自身优势？'
            ],
            guest:'饶玥  杜克大学毕业生<br>' +
            '贾如竞 圣路易斯华盛顿大学毕业生<br>' +
            '李虹 脉脉增长市场总监',
            backgroundImg:'images/eventPopupBJ.png'
        },
        {
            event:'北京场（第二场）',
            title:'海归的职场故事 - 你到底要不要去留学？',
            time:'12月15日（周六）下午14:00 – 16:00',
            location:'花旗银行北京分行（北京市西城区武定侯街6号 卓著中心十八层会议室）',
            content:[
                '海归如何找到满意的工作？',
                '海归在职场的优势为何？如何在职场脱颖而出？',
                '名企HR到底看中海归派什么特质？'
            ],
            guest:'吴晶晶  花旗中国零售银行投资策略总监<br>' +
            '饶玥  杜克大学毕业生<br>' +
            '贾如竞 圣路易斯华盛顿大学毕业生<br>' +
            '李虹 脉脉增长市场总监',
            backgroundImg:'images/eventPopupBJ.png'
        }
    ];
    var eventSlide=$('#swiper1 .eventSlide'),
        eventSlideIndex=0;
    eventSlide.click(function () {
        eventSlideIndex=$(this).index();
        $('.popupEvent').html(eventList[eventSlideIndex].event);
        $('.popupEventTitle span').html(eventList[eventSlideIndex].title);
        $('.popupEventTime span').html(eventList[eventSlideIndex].time);
        $('.popupEventLocation span').html(eventList[eventSlideIndex].location);
        $('.popupEventContent ul').empty();
        for(var i=0;i<eventList[eventSlideIndex].content.length;i++){
            $('.popupEventContent ul').append('<li><span>'+eventList[eventSlideIndex].content[i]+'</span></li>');
        }
        $('.popupEventContent p').html(eventList[eventSlideIndex].guest);
        $('#eventPopup .popupContent').css('background','#fff url("'+eventList[eventSlideIndex].backgroundImg+'") no-repeat bottom right');

        openPopup('eventPopup');
    });

    var liveList=[
        {
            event:'第一场',
            title:'新政下，美国留学，该不该去？',
            time:'11月29日 （周四）下午19:00 – 20:00',
            content:[
                '美国新政如何影响了留学？是否还应该选择美国作为留学目的地？',
                '英﹑美﹑澳﹑加留学体系各有什么不同？又该如何作留学准备？',
                '不菲的留学储备金如何提前规划？',
                '银行可以提供的留学服务远不止金融服务'
            ],
            guest:'赵俊，英孚留学备考中心全国学术总监<br>' +
            '朱琛，花旗银行财富策划经理',
            avatar:'images/zhaojun.jpg'
        },
        {
            event:'第二场',
            title:'出国留学了，才发觉有那么多的“想不到”',
            time:'12月6日 （周四）下午19:00 – 20:00',
            content:'每个人留学前都有一番在国外学习、生活的畅想，但是真正离开父母、走到陌生的校园，一切原来都是“想不到”的。留学到底有哪些是想不到的呢？我们一起听听朱婧 - 一个美国名校4年斩获3门专门的女孩 - 怎么说。她的留学心得更已著作成书，观看本场直播，有机会获作者亲笔签名书《出国这问题》。',
            guest:'朱婧，《出国这问题》作者',
            avatar:'images/zhujing.jpg'
        },
        {
            event:'第三场',
            title:'从名校求学，到归国进入顶尖外资银行 - 常春藤名校毕业生分享会',
            time:'12月13日（周四）下午19:00 – 20:00',
            content:'他们都是“天之骄子”，进入全球一流的“常春藤”院校，学成归来，经过层层过关斩将，如今悉数就职于花旗银行，且头顶“管理培训生”的光环。让我们一起来探讨他们留学申请、留学生活、留学归来的一路历程。',
            guest:'舒心，毕业于康奈尔大学<br>' +
            '刘思嘉，毕业于哥伦比亚大学<br>' +
            '辛竞一，毕业于哥伦比亚大学',
            avatar:'images/shuxin_live.jpg'
        },
        {
            event:'第四场',
            title:'哥大面试官，教你进名校不是梦',
            time:'12月18日 （周二）下午19:00 – 20:00',
            content:'15岁到美国，高中2.76 GPA进入约翰·霍普金斯大学大学2.58 GPA进入哥伦比亚大学商学院。他是如何办到？如何为自己加分？分数不是唯一的途径……<br>' +
           '如今身为哥伦比亚大学面试官，他又能教授你怎样的面试技巧，走进名校大门？',
            guest:'Paul SHIH，哥伦比亚大学商学院亚洲区官方代表、哥伦比亚大学面试官',
            avatar:'images/shuxin_live.jpg'
        },
        {
            event:'第五场',
            title:'回国求职，留学生能胜过国内“985”“211”高校毕业生吗？',
            time:'12月20日（周四）下午19:00 – 20:00',
            content:'学成归来，留学生在中国职场“吃香”吗？留学生又该如何让自己在优秀的国内院校毕业生中拔得头筹？资深HR又是如何看待海归的？来自独家职业成长平台脉脉的专家，来自国际领先4A公司的人才发展部总监，以及来自国际知名人力资源公司的高级顾问，将给大家带来全方位的分享，为留学生的归国求职路指点迷津。',
            guest:'凌隽，脉脉人力资源副总裁<br>' +
            '张舰平，福莱国际传播咨询公司人才发展部总监<br>' +
            '刘雅琼，上海仕卿人力资源有限公司 高级顾问',
            avatar:'images/linjuan.jpg'
        }
    ];
    var liveSlide=$('#swiper2 .eventSlide'),
        liveSlideIndex=0;
    liveSlide.click(function () {
        liveSlideIndex=$(this).index();
        $('.livePopupAvator_td img').attr('src',liveList[liveSlideIndex].avatar);
        $('.popupLive').html(liveList[liveSlideIndex].event);
        $('.popupLiveitle span').html(liveList[liveSlideIndex].title);
        $('.popuLiveTime span').html(liveList[liveSlideIndex].time);
        var description=liveList[liveSlideIndex].content;
        if((typeof description)=='string'){
            $('.popupLiveDescription ul').hide().empty();
            $('.popupLiveDescription p').show().html(description);
        }else{
            $('.popupLiveDescription p').hide();
            $('.popupLiveDescription ul').show().empty();
            for(var i=0;i<description.length;i++){
                $('.popupLiveDescription ul').append('<li><span>'+description[i]+'</span></li>');
            }
        }
        $('.popupLiveContent p').html(liveList[liveSlideIndex].guest);

        openPopup('livePopup');
    });
});