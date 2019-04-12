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
        clearTimeout(id);
    };
}());

function setTransform(value) {
	if ('WebkitTransform' in document.documentElement.style)
		return { '-webkit-transform': value };
	else if ('MozTransform' in document.documentElement.style)
		return { '-moz-transform': value };
	else if ('OTransform' in document.documentElement.style)
		return { '-o-transform': value };
	else if ('msTransform' in document.documentElement.style)
		return { '-ms-transform': value };
	else
		return { 'transform': value };
}

function setFilter(value) {
	if ('WebkitFilter' in document.documentElement.style)
		return { '-webkit-filter': value };
	else
		return { 'filter': value };
}

function set_size() {
	var contentWidth = $('#layout').width();
	$('html,body').css({'font-size': contentWidth / 750 * 28});
}

$(window).resize(set_size);
set_size();
document.body.addEventlistener = function(e) {
	e.preventDefault();
}
window.setTimeout(function() {
	$('#alphabet').css(setFilter('blur(0)'));
}, 2000);

var imagePath = 'images/';
(function() {
	var triangle = function(x1, y1, x2, y2, x3, y3, fillStyle) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
		this.fillStyle = fillStyle;
	}
	triangle.prototype = {
		createPath: function(context) {
			context.beginPath();
			context.moveTo(this.x1, this.y1);
			context.lineTo(this.x2, this.y2);
			context.lineTo(this.x3, this.y3);
			context.closePath();
		},
		fill: function(context) {
			this.createPath(context);
			context.fillStyle = this.fillStyle;
			context.fill();
		}
	}

	function blend(ctx1, ctx2) {
		var imgData1 = ctx1.getImageData(0, 0, ctx1.canvas.width, ctx1.canvas.height),
			data1 = imgData1.data,
	    	data2 = ctx2.getImageData(0, 0, ctx2.canvas.width, ctx2.canvas.height).data;

	    var darken = function (a, b) {
	        var r = {};
	        for (var i in a) {
	            r[i] = Math.abs(a[i] - b[i]);
	        }
	        return r;
	    }

	    for (var i = 0, len = data1.length; i < len; i += 4) {
	        var newRGB = darken(
	            {r: data1[i], g: data1[i + 1], b: data1[i + 2]},
	            {r: data2[i], g: data2[i + 1], b: data2[i + 2]}
	        );

	        data1[i] = newRGB.r;
	        data1[i + 1] = newRGB.g;
	        data1[i + 2] = newRGB.b;
	    }
	    ctx1.putImageData(imgData1, 0, 0);
	}

	var images = ['college_frame.png', 'part2bg.jpg'],
		imageObject = new Object,
		imagesLoadedCount = 0;
	for (var i = 0; i < images.length; i++) {
		(function(ind) {
			var image = new Image;
			image.onload = function() {
				imageObject[this.src.replace(/(.+?\/)?(\w+)\.(png|jpg)/i, '$2')] = this;
				if (++imagesLoadedCount >= images.length) {
					var canvas = document.getElementById('college_bg'),
						context = canvas.getContext('2d'),
						trigger = document.getElementById('trigger'),
						triggerContext = trigger.getContext('2d'),
						tri = new triangle(139, 35, 649, 173, 275, 545, 'rgba(33,55,71,0.9)');

					tri.fill(triggerContext);
					context.save();
					tri.createPath(context);
					context.clip();
					context.drawImage(imageObject.part2bg, 0, -169);
					context.restore();
					blend(context, triggerContext);
					context.drawImage(imageObject.college_frame, 107, 0);

					// animate();
				}
			}
			image.src = imagePath + images[ind];
		})(i);
	}

	var y = 0,
		maxY = 5,
		minY = -5,
		yStep = parseInt(Math.random() * 2, 10) % 2 == 0 ? 0.1 : -0.1;

	function animate() {
		if (y < minY) {
			y = minY;
			yStep = -yStep;
		} else if (y > maxY) {
			y = maxY;
			yStep = -yStep;
		} else y += yStep;

		$('#college_bg').css(setTransform('translate(0, ' + y + 'px)'));
		$('#college').css(setTransform('translate(0, ' + (-y / 2) + 'px)'));
		requestAnimationFrame(animate);
	}
})();


var canvas_circle = function(x, y, radius, strokeStyle, centerRadiusInner, centerInnerFillStyle, centerRadiusOuter, centerOuterFillStyle, stepFinished, gou) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.strokeStyle = strokeStyle;
	this.centerRadiusInner = centerRadiusInner;
	this.centerInnerFillStyle = centerInnerFillStyle;
	this.centerRadiusOuter = centerRadiusOuter;
	this.centerOuterFillStyle = centerOuterFillStyle;
	this.stepFinished = stepFinished;
	this.gou = gou;
}
canvas_circle.prototype = {
	createPath: function(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.closePath();
	},
	createCenterInnerPath: function(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.centerRadiusInner, 0, Math.PI * 2, false);
		context.closePath();
	},
	createCenterOuterPath: function(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.centerRadiusOuter, 0, Math.PI * 2, false);
		context.closePath();
	},
	fill: function(context) {
		context.save();
		context.lineWidth = 2;
		if (this.stepFinished) {
			this.createPath(context);
			context.fillStyle = this.centerOuterFillStyle;
			context.fill();
			context.drawImage(this.gou, this.x - this.gou.width / 2, this.y - this.gou.height / 2);
		} else {
			this.createPath(context);
			context.strokeStyle = this.strokeStyle;
			context.stroke();
			if (!this.centerRadiusInner == 0) {
				if (this.centerInnerFillStyle == null) {
					context.beginPath();
					context.arc(this.x, this.y, this.centerRadiusOuter, 0, Math.PI * 2, false);
					context.arc(this.x, this.y, this.centerRadiusInner, 0, Math.PI * 2, true);
					context.fillStyle = this.centerOuterFillStyle;
					context.fill();
					context.closePath();
				} else {
					this.createCenterOuterPath(context);
					context.fillStyle = this.centerOuterFillStyle;
					context.fill();
					this.createCenterInnerPath(context);
					context.fillStyle = this.centerInnerFillStyle;
					context.fill();
				}
			}
		}
		context.restore();
	}
}

var canvas_line = function(x1, y1, x2, y2, lineWidth, strokeStyle, x3, strokeStyle2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.lineWidth = lineWidth;
	this.strokeStyle = strokeStyle;
	this.x3 = x3;
	this.strokeStyle2 = strokeStyle2;
}
canvas_line.prototype = {
	createPath: function(context) {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.closePath();
	},
	createPath2: function(context) {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x3, this.y2);
		context.closePath();
	},
	stroke: function(context) {
		context.save();
		context.lineWidth = this.lineWidth;
		this.createPath(context);
		context.strokeStyle = this.strokeStyle;
		context.stroke();
		if (this.x1 != this.x3) {
			this.createPath2(context);
			context.strokeStyle = this.strokeStyle2;
			context.stroke();
		}
		context.restore();
	}
}

window.step = function() {
	var icon_radius = 13,	//icon半径
		center_icon_radius = 5,	//icon小圆半径
		gap = 58,	//两圆间隔
		srartX = 45,	//起始x轴位置
		startY = 15,	//起始y轴位置
		lineWidth = 2,	//连接线宽
		animationFrame,
		curStepIndex = 0,	//当前步骤下标
		tTime = 500,	//总共需要时间（毫秒）
		startTime;	//起始时间

	var iconArray = new Array,	//icon
		lineArray = new Array;	//icon连接线

	var draw_icon = function(context, gou) {
		var step_icon = new canvas_circle(srartX, startY, icon_radius, 'rgba(227,226,225,0.4)', center_icon_radius, null, icon_radius, '#e3e2e1', false, gou);
		step_icon.fill(context);
		iconArray.push(step_icon);
		for (var i = 0; i < 6; i++) {
			step_icon = new canvas_circle(step_icon.x + gap + icon_radius * 2, startY, icon_radius, 'rgba(227,226,225,0.4)', 0, null, 0, '#e3e2e1', false, gou);
			step_icon.fill(context);
			iconArray.push(step_icon);
		}
	};

	var draw_line = function(context) {
		var line = new canvas_line(srartX + icon_radius, startY, srartX + icon_radius + gap, startY, lineWidth, 'rgba(227,226,225,0.4)', srartX + icon_radius, '#e3e2e1');
		line.stroke(context);
		lineArray.push(line);
		for (var i = 0; i < 5; i++) {
			line = new canvas_line(line.x2 + icon_radius * 2, startY, line.x2 + icon_radius * 2 + gap, startY, lineWidth, 'rgba(227,226,225,0.4)', line.x2 + icon_radius * 2, '#e3e2e1');
			line.stroke(context);
			lineArray.push(line);
		}
	};

	function lineAnimate(context, obj, t) {
		obj.x3 = obj.x1 + gap * (t / 100);
		obj.stroke(context);
	}

	function iconAnimate(context, obj, t) {
		var radius = icon_radius * (t / 100);
		obj.centerRadiusOuter = radius;
		obj.centerRadiusInner = Math.min(center_icon_radius, radius);
		obj.fill(context);
	}

	function animateNext(canvas, context, t, date) {
		context.clearRect(0, 0, canvas.width, canvas.height);

		lineArray.forEach(function(line, index) {
			if (curStepIndex - 1 == index && t >= 0) lineAnimate(context, line, Math.min(t, 100));
			else line.stroke(context);
		});

		iconArray.forEach(function(icon, index) {
			if (curStepIndex == index && t >= 100) iconAnimate(context, icon, Math.min(t - 100, 100));
			else icon.fill(context);
		});

		if (t >= 200) {
			window.cancelAnimationFrame(animationFrame);
		} else {
			t = Math.min(date - startTime, tTime) / tTime * 200;
			animationFrame = window.requestAnimationFrame(function() {
				animateNext(canvas, context, t, new Date);
			});
		}
	}

	var init = function() {
		var canvas = document.getElementById('step'),
			context = canvas.getContext('2d');
		var image = new Image;
		image.onload = function() {
			draw_line(context);
			draw_icon(context, this);
		}
		image.src = imagePath + 'gou.png';
		return {
			nextStep: function() {
				if (curStepIndex == iconArray.length - 1) {
					iconArray[curStepIndex].stepFinished = true;
					iconArray[curStepIndex].fill(context);
				} else {
					iconArray[curStepIndex].stepFinished = true;
					curStepIndex++;
					animateNext(canvas, context, 0, startTime = new Date);
				}
			}
		}
	}
	return init();
};
var stepCanvas = step();

var canvas_text = function(x, y, text, fillStyle, font, textAlign, textBaseline) {
	this.x = x;
	this.y = y;
	this.text = text;
	this.fillStyle = fillStyle;
	this.font = font;
	this.textAlign = textAlign;
	this.textBaseline = textBaseline;
}
canvas_text.prototype = {
	fill: function(context) {
		context.textAlign = this.textAlign ? this.textAlign : 'center';
		context.textBaseline = this.textBaseline ? this.textBaseline : 'middle';
		context.font = this.font;
		context.fillStyle = this.fillStyle;
		context.fillText(this.text, this.x, this.y);
	}
}

var canvas_rect = function(x, y, width, height, fillStyle) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.fillStyle = fillStyle;
}
canvas_rect.prototype = {
	createPath: function(context) {
		context.beginPath();
		context.moveTo(0,this.y);
		context.lineTo(this.width,this.y);
		context.arc(this.width,this.y+this.height/2,this.height/2,(Math.PI/180)*-90,(Math.PI/180)*90,false);
		context.lineTo(0,this.y+this.height);
		context.lineTo(0,this.y);
		context.closePath();
	},
	fill: function(context) {
		this.createPath(context);
		context.fillStyle = this.fillStyle;
		context.fill();
	}
}

var partNum = 1,
	selectedOption = new Array,
	selectedOptionMean = [
		['a', 'b', 'c'],
		['d', 'b', 'e'],
		['n', 'd', 'g'],
		['f', 'h', 'i'],
		['l', 'j', 'i'],
		['k', 'n', 'i'],
		['k', 'm', 'e']
	],
	resultData = {
		a: { name: '无死角颜控质检员', intro: '始终坚持以“颜值即正义”为中心思想，对人|与事都推崇着“始于颜值”的统一原则。', count: 0 },
		b: { name: '批量内心戏生产者', intro: '天生戏精体质，分裂人格中内心戏尤其丰富多|彩，一个眼神就能将整个故事构建完。', count: 0 },
		c: { name: '新品上市预告员', intro: '行走在新潮事物前沿，比新事物本物更早知道|上市信息，捕抓信息后第一时间收割新品，成|为社交平台上新事物预告员。', count: 0 },
		d: { name: '自带BGM特效师', intro: '自带BGM出场，一秒聚焦全场的气场并享受站|在宇宙中心呼唤爱', count: 0 },
		e: { name: '新奇事物收割机', intro: '对有趣的事物充满猎奇感，但凡有趣必定收割', count: 0 },
		f: { name: '重度躺癌患者', intro: '拥有能躺着绝不站着的特异功能，对舒适绵软|的材质毫无抵抗能力，程度深者获得一触即倒|的高级碰瓷术', count: 0 },
		g: { name: '自学型美学鉴赏师', intro: '有自己一套独特的审美体系，在追求美的路上|有自己独特的执念和见解', count: 0 },
		h: { name: '选择性撒手型人才', intro: '本着相信科学相信专业的原则，暂时性地放下|操劳的心，全心全意将事情交付给值得信任的|人，并投入到享受撒手的快感中', count: 0 },
		i: { name: '隐藏菜单谍报员', intro: '无论在哪里都能深挖出隐藏菜单，以猎奇新事|物为己任，运用摸索的一套暗号打开全新世|界，把大众的菜单改写成小众的打开方式', count: 0 },
		j: { name: '暴走的百科全书', intro: '追求知识的广度和深度，整容式学识加成，常|常给人以张口跪的反差感', count: 0 },
		k: { name: '间歇性孤僻人士', intro: '偶尔想要独自安静地享受来自空间感的广阔，|避开外界滋扰寻求自我孤僻的人士。', count: 0 },
		l: { name: '冷门SSR收藏家', intro: '对小众和冷门的事物有独特的偏好，不追逐主|流，自己就是标准', count: 0 },
		m: { name: '一次性投入型玩家', intro: '享受每一次的畅玩，玩就要玩得酣畅淋漓', count: 0 },
		n: { name: '野生米其林美食家', intro: '遵循着一套自己对美食的鉴赏标准，秉承着唯|有美食不可辜负和挖掘新味蕾的极致享受型美|食宗旨。', count: 0 }
	};
	// for (var i = 0; i < 7; i++)
	// 	selectedOption.push(parseInt(Math.random() * 3, 10));
function showResult() {
	for (var i = 0; i < selectedOption.length; i++)
		resultData[selectedOptionMean[i][parseInt(selectedOption[i], 10)]].count += 1;
	var maxCount = 0,
		nameArray = new Array;
	for (var attr in resultData) {
		if (resultData[attr].count > maxCount) {
			maxCount = resultData[attr].count;
			nameArray = [];
			nameArray.push(attr);
		} else if (resultData[attr].count == maxCount)
			nameArray.push(attr);
	}

	var imgSign = nameArray[parseInt(Math.random() * nameArray.length)],
		imgName = 'res_' + imgSign + '.png',
		intro = resultData[imgSign].intro,
		images = ['part10bg.jpg', 'save.jpg'];
		imageObject = new Object,
		imagesLoadedCount = 0;
	images.push(imgName);
	for (var i = 0; i < images.length; i++) {
		(function(ind) {
			var image = new Image;
			image.onload = function() {
				if (this.src.indexOf('res_') > -1)
					imageObject['res'] = this;
				else
					imageObject[this.src.replace(/(.+?\/)?(\w+)\.(png|jpg)/i, '$2')] = this;
				if (++imagesLoadedCount >= images.length) {
					var img = document.getElementById('res_img_canvas'),
						imgContext = img.getContext('2d'),
						save = document.getElementById('res_save_canvas'),
						saveContext = save.getContext('2d'),
						rect1 = new canvas_rect(0, 84, 180, 68, '#20303B'),
						name = new canvas_text(100, 118, $.trim($('#name').val()), '#B1988B', 'bold 32px Arial'),
						introLineHeight = 23,
						introArray = intro.split('|');

					imgContext.drawImage(imageObject.part10bg, 0, 0);
					imgContext.drawImage(imageObject.res, 105, 0);
					rect1.fill(imgContext);
					name.fill(imgContext);

					name.y = 196;
					rect1.y = 162;

					saveContext.drawImage(imageObject.save, 0, 0);
					saveContext.drawImage(imageObject.res, 105, 89);
					rect1.fill(saveContext);
					name.fill(saveContext);

					for (var i = 0; i < introArray.length; i++) {
						var text = new canvas_text(90, 550 + i * (introLineHeight + 28), introArray[i], '#ffffff', '28px Arial', 'left', 'top');
						text.fill(imgContext);
						text.y += 88;
						text.fill(saveContext);
					}

					$('#res_img').prop('src', img.toDataURL('image/jpeg'));
					$('#res_save').prop('src', save.toDataURL('image/jpeg'));
				}
			}
			image.src = imagePath + images[ind];
		})(i);
	}
}
// showResult();

var isPageAnimate =  false;
function nextPage(tag) {
	if (isPageAnimate) return;
	isPageAnimate = true;
	var delay = 0;
	//当前partNum
	switch(partNum) {
		case 2:
			var name = $.trim($('#name').val());
			if (name == '') {
				alert('请输入您的名字');
				return;
			} else if (name.length > 6) {
				alert('最多输入6个字');
				return;
			}
			break;
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			selectedOption.push($(tag).data('index'));
			$(tag).addClass('selected');
			delay = 500;
			break;
	}
	window.setTimeout(function() {
		if (partNum == 1) {
			$('#part1').css({backgroundPosition: '100% 0'});
			$('#part1_move').css(setTransform('translate(-100%,0)'))
		}
		if (partNum == 2) $('#part1').addClass('prev');

		if (partNum > 1) $('#part' + partNum).addClass('prev');
		$('#part' + (++partNum)).removeClass('next');
		//到达partNum
		switch(partNum) {
			case 2:
				window.setTimeout(function() {
					$('#alphabet2').css(setFilter('blur(0)'));
				}, 1000);
				break;
			case 3:
				$('#step').addClass('show');
				break;
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				stepCanvas.nextStep();
				break;
			case 10:
				stepCanvas.nextStep();
				$('#step').removeClass('show');
				showResult();
				break;
		}
	}, delay);
	window.setTimeout(function() {
		isPageAnimate = false;
	}, 500 + delay);
}

$(function(){
	$('#share_btn').click(function(){
		$('#overLay').show();
	});
    $('#overLay').click(function(){
    	$(this).hide();
	});
});