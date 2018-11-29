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

var snowContainer = document.getElementById('dropCanvas'),
    canvas = document.createElement('canvas');
canvas.width = $(window).width();
canvas.height = $(window).height();
snowContainer.appendChild(canvas);

var context = canvas.getContext('2d'),
    snowArray = new Array,
    defaultSnowRadius = 8,
    lastTime = 0,
    createDuration = Math.random(),
    animationFrame,
    srcArray=[
        'images/green_leaves1.png',
        'images/green_leaves2.png',
        'images/red_leaves1.png',
        'images/red_leaves2.png',
        'images/money.png'
    ];


var snow = function(src, x, y, dw,dh, speed) {
    this.src = src;
    this.x = x;
    this.y = y;
    this.dw = dw;
    this.dh = dh;
    this.speed = speed;
    this.isEnd = false;
};

snow.prototype = {
    drawImg:function(context){
        context.drawImage(this.src, this.x, this.y, this.dw, this.dh)
    },
    fill: function(context) {
        context.save();
        this.drawImg(context);
        context.restore();
    },
    move: function() {
        this.y = parseFloat(this.speed) + parseFloat(this.y);
    }
};

function createSnow() {
    var snowImg=new Image();
    snowImg.src=srcArray[Math.floor(Math.random()*5+0)];

    var speed = (Math.random() * 1.5 + 0.5).toFixed(2),
        size = (Math.random() * 1.3 + 0.7).toFixed(0),
        minSnowX = (defaultSnowRadius * size).toFixed(0),
        maxSnowX = (canvas.width - defaultSnowRadius * size).toFixed(0),
        snowX = parseFloat(Math.random() * (maxSnowX - minSnowX) + minSnowX).toFixed(0),
        s = new snow(snowImg,snowX, minSnowX * 2, minSnowX, minSnowX, speed);
    s.fill(context);
    snowArray.push(s);
}

function snowMove(date) {
    if (date - lastTime > createDuration) {
        createSnow();
        lastTime = date;
        createDuration = Math.random()+300;
    }
    var endIndex = -1,
        i = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snowArray.forEach(function(s) {
        if (!s.isEnd) {
            s.move();
            s.fill(context);
            if(s.y>canvas.height){
                s.isEnd=true;
            }
        } else {
            endIndex = i;
        }
        i++;
    });
    if (endIndex > -1) snowArray.splice(endIndex, 1);
    if (snowArray.length == 0) window.cancelAnimationFrame(animationFrame);
    else {
        animationFrame = window.requestAnimationFrame(function() {
            snowMove(new Date);
        });
    }
}
animationFrame = window.requestAnimationFrame(function() {
    snowMove(new Date);
});