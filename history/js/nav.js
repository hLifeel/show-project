document.write(`
    <div id="nav" class="nav">
        <a href="index.html" title="首页" class="hasURL logo"><img src="images/logo.png" class="" alt=""></a>
        <img src="images/mobile_menu.png" class="mobile mobile_menu" alt="">

        <div class="nav_wrap pc">
            <ul class="nav_list">
                <li class="nav_item">
                    <a href="news.html" title="最新消息" class="hasURL">最新消息<span>News</span></a>
                </li>
                <li class="nav_item">
                    <a href="about.html" title="故事介紹" class="hasURL">故事介紹<span>About us</span></a>
                </li>
                <li class="nav_item has_sub">
                    <a href="javascript:void(0);" title="兩岸故事館" class="">兩岸故事館<span>Exhibitions</span></a>
                    <ul class="sub_nav">
                        <li class="sub_nav_item">
                            <a href="track.html" title="遷臺軌跡" class="hasURL">遷臺軌跡<span>Relocation track</span></a>
                        </li>
                        <li class="sub_nav_item">
                            <a href="heirloom.html" title="我的傳家寶" class="hasURL">我的傳家寶<span>Heirloom</span></a>
                        </li>
                        <li class="sub_nav_item">
                            <a href="military_glory.html" title="軍旅榮光·特種花美男" class="hasURL">軍旅榮光·特種花美男<span>Military glory</span></a>
                        </li>
                        <li class="sub_nav_item">
                            <a href="figure.html" title="女性身影" class="hasURL">女性身影<span>Female figure</span></a>
                        </li>
                        <li class="sub_nav_item">
                            <a href="character.html" title="人物紀實映畫" class="hasURL">人物紀實映畫<span>Character</span></a>
                        </li>
                    </ul>
                </li>
                <li class="nav_item">
                    <a href="video.html" title="線上說故事" class="hasURL">線上說故事<span>Video</span></a>
                </li>
            </ul>
        </div>
    </div>
    <div class="mobile_nav_bg"></div>
`);