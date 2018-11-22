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

Object.prototype.setTransform = function(value) {
	if ('MozTransform' in document.documentElement.style) this.style.MozTransform = value;
	else if ('webkitTransform' in document.documentElement.style) this.style.webkitTransform = value;
	else if ('oTransform' in document.documentElement.style) this.style.oTransform = value;
	else if ('msTransform' in document.documentElement.style) this.style.msTransform = value;
	else this.style.transform = value;
	return this;
}

Object.prototype.setTransition = function(value) {
	if ('MozTransition' in document.documentElement.style) this.style.MozTransition = value;
	else if ('webkitTransition' in document.documentElement.style) this.style.webkitTransition = value;
	else if ('oTransition' in document.documentElement.style) this.style.oTransition = value;
	else if ('msTransition' in document.documentElement.style) this.style.msTransition = value;
	else this.style.Transition = value;
	return this;
}

Object.prototype.setAnimation = function(value) {
	if ('MozAnimation' in document.documentElement.style) this.style.MozAnimation = value;
	else if ('webkitAnimation' in document.documentElement.style) this.style.webkitAnimation = value;
	else if ('oAnimation' in document.documentElement.style) this.style.oAnimation = value;
	else if ('msAnimation' in document.documentElement.style) this.style.msAnimation = value;
	else this.style.animation = value;
	return this;
}

Object.prototype.setStyle = function(style) {
	for (var attr in style) {
		if (typeof style[attr] == 'function') break;
		if (attr == 'transform') this.setTransform(style[attr]);
		else if (attr == 'animation') this.setAnimation(style[attr]);
		else if (attr == 'transition') this.setTransition(style[attr]);
		else this.style[attr] = style[attr];
	}
	return this;
}

Object.prototype.hasClassName = function(cls) {
	return this.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

Object.prototype.addClassName = function(cls) {
	if (!this.hasClassName(cls)) this.className += ' ' + cls;
	return this;
}

Object.prototype.removeClassName = function(cls) {
	if (this.hasClassName(cls)) this.className = this.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), '');
	return this;
}

Object.prototype.hideObject = function() {
	if (this.length > 0) {
		for (var i = 0; i < this.length; i++)
			this[i].style.display = 'none';
	} else
		this.style.display = 'none';
	return this;
}

Object.prototype.showObject = function() {
	if (this.length > 0) {
		for (var i = 0; i < this.length; i++)
			this[i].style.display = 'block';
	} else
		this.style.display = 'block';
	return this;
}

Object.prototype.objectIsHide = function() {
	return this.style.display != 'block';
}

Object.prototype.prevObject = function() {
	var node = this.previousSibling;
	while (node.nodeType != 1)
		node = node.previousSibling;
	if (!node) return null;
	return node;
}

Object.prototype.nextObject = function() {
	var node = this.nextSibling;
	while (node.nodeType != 1)
		node = node.nextSibling;
	if (!node) return null;
	return node;
}

var canvas_rect = function(x, y, width, height, radius, lineWidth, strokeStyle, fillStyle) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.radius = radius;
	this.lineWidth = lineWidth;
	this.strokeStyle = strokeStyle;
	this.fillStyle = fillStyle;
}
canvas_rect.prototype = {
	createPath: function(context) {
		context.beginPath();
		if (this.radius) {
			context.moveTo(this.x + this.radius, this.y);
			context.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.radius, this.radius);
			context.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - this.radius, this.y + this.height, this.radius);
			context.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - this.radius, this.radius);
			context.arcTo(this.x, this.y, this.x + this.radius, this.y, this.radius);
		} else
			context.rect(this.x, this.y, this.width, this.height);
		context.closePath();
	},
	fill: function(context) {
		context.save();
		this.createPath(context);
		if (this.fillStyle) {
			context.fillStyle = this.fillStyle;
			context.fill();
		}
		if (this.strokeStyle) {
			context.lineWidth = this.lineWidth;
			context.strokeStyle = this.strokeStyle;
			context.stroke();
		}
		context.restore();
	}
}

var canvas_image = function(x, y, image, popupid) {
	this.x = x;
	this.y = y;
	this.image = image;
	this.popupid = popupid;

	this.is_touched = false;
}
canvas_image.prototype = {
	path2: function(context) {
		context.beginPath();
		context.rect(this.x, this.y, this.image.width, this.image.height);
		context.closePath();
	},
	draw: function(context) {
		context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
	},
	draw2: function(context) {
		context.drawImage(this.image, this.x, this.y);
	}
}

var canvas_image2 = function(x, y, width, height, index, image, popupid) {
	canvas_image.call(this, x, y, image, popupid);
	this.width = width;
	this.height = height;
	this.index = index;
}
canvas_image2.prototype = new canvas_image();
canvas_image2.prototype.constructor = canvas_image2;
canvas_image2.prototype.path2 = function(context) {
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.closePath();
}
canvas_image2.prototype.draw2 = function(context) {
	context.drawImage(this.image, this.width * this.index, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}

var canvas_line = function(x1, y1, x2, y2, strokeStyle, rotate) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.strokeStyle = strokeStyle;
	this.rotate = rotate;

	this.is_draw = true;
	this.is_animate = false;
	this.t = 1;
}
canvas_line.prototype = {
	createPath: function(context) {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.closePath();
	},
	stroke: function(context) {
		if (this.is_draw) {
			if (this.is_animate) {
				this.t -= 0.05;
				context.save();
				context.globalAlpha = Math.max(this.t, 0);
				context.translate(this.x1 + (this.x2 - this.x1) / 2, this.y1 + (this.y2 - this.y1) / 2);
				context.rotate(45 * Math.PI / 180);
				context.translate(-(this.x1 + (this.x2 - this.x1) / 2), -(this.y1 + (this.y2 - this.y1) / 2));
				this.createPath(context);
				if (this.y1 == this.y2) {
					this.y1++;
					this.y2++;
				} else if (this.x1 == this.x2) {
					this.x1++;
					this.x2++;
				}
				context.strokeStyle = this.strokeStyle;
				context.stroke();
				context.restore();
			} else {
				this.createPath(context);
				context.strokeStyle = this.strokeStyle;
				context.stroke();
				context.restore();
			}
		}
	}
}

function windowToCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x: (x - bbox.left) * canvas.width / bbox.width,
		y: (y - bbox.top) * canvas.height / bbox.height
	};
}

var imagesPath = 'images/';

;(function() {
	var images = ['mgm_gift1.png','mgm_gift2.png','mgm_gift3.png','mgm_gift4.png','mgm_gift5.png','mgm_gift6.png','mgm_gift7.png','mgm_gift8.png','mgm_tips1.png','mgm_tips2.png','mgm_tips3.png','mgm_tips4.png','mgm_tips5.png'],
		imageObject = new Object,
		imageLoadedOk = 0;

	for (var i = 0; i < images.length; i++) {
		(function(ind) {
			var image = new Image;
			image.onload = function() {
				imageObject[this.src.replace(/.+mgm_(\w+)\.(png|jpg)/i, '$1')] = this;
				if (++imageLoadedOk >= images.length) {
					var canvas = document.getElementById('canvas');
					if (canvas) {
						var context = canvas.getContext('2d'),
							border = new canvas_rect(4, 4, 475, 669, 26, 8, '#c00', null),

							tips1 = new canvas_rect(97, 0, 166, 31, null, null, null, '#c00'),
							tips1Text = new canvas_image(tips1.x + tips1.width / 2, tips1.y + tips1.height / 2, imageObject.tips1),
							tips2 = new canvas_rect(259, 190, 156, 34, null, null, null, '#c00'),
							tips2Text = new canvas_image(tips2.x + tips2.width / 2, tips2.y + tips2.height / 2, imageObject.tips2),
							tips3 = new canvas_rect(8, 334, 170, 34, null, null, null, '#c00'),
							tips3Text = new canvas_image(tips3.x + tips3.width / 2, tips3.y + tips3.height / 2, imageObject.tips3),
							tips4 = new canvas_rect(348, 515, 127, 33, null, null, null, '#c00'),
							tips4Text = new canvas_image(tips4.x + tips4.width / 2, tips4.y + tips4.height / 2, imageObject.tips4),
							tips5 = new canvas_rect(183, 643, 160, 26, null, null, null, '#c00'),
							tips5Text = new canvas_image(tips5.x + tips5.width / 2, tips5.y + tips5.height / 2, imageObject.tips5),
							
							group_border1 = new canvas_rect(178, 190, 5, 480, null, null, null, '#c00'),
							group_border2 = new canvas_rect(178, 190, 297, 5, null, null, null, '#c00'),
							group_border3 = new canvas_rect(183, 335, 165, 5, null, null, null, '#c00'),
							group_border4 = new canvas_rect(343, 339, 5, 330, null, null, null, '#c00'),

							group_crop_line1 = new canvas_line(181, 31, 181, 190, '#c00'),
							group_crop_line2 = new canvas_line(346, 223, 346, 335, '#c00'),
							group_crop_line3 = new canvas_line(183, 483, 343, 483, '#c00'),

							gift1_crop_array = new Array,
							gift1_link_line1 = new canvas_rect(8, 98, 16, 4, null, null, null, '#c00'),
							gift1_link_line1_crop = new canvas_line(21, 100, 34, 100, '#c00'),
							gift1_link_line2 = new canvas_rect(8, 226, 16, 4, null, null, null, '#c00'),
							gift1_link_line2_crop = new canvas_line(21, 228, 34, 228, '#c00'),
							gift1_link_line3 = new canvas_rect(91, 318, 4, 16, null, null, null, '#c00'),
							gift1_link_line3_crop = new canvas_line(93, 300, 93, 318, '#c00'),
							gift1_link_line4 = new canvas_rect(164, 225, 15, 4, null, null, null, '#c00'),
							gift1_link_line4_crop = new canvas_line(152, 227, 164, 227, '#c00'),
							gift1_link_line5 = new canvas_rect(165, 98, 16, 4, null, null, null, '#c00'),
							gift1_link_line5_crop = new canvas_line(152, 100, 165, 100, '#c00'),

							gift2_crop_array = new Array,
							gift2_link_line1 = new canvas_rect(182, 98, 32, 4, null, null, null, '#c00'),
							gift2_link_line1_crop = new canvas_line(214, 100, 244, 100, '#c00'),
							gift2_link_line2 = new canvas_rect(327, 174, 4, 16, null, null, null, '#c00'),
							gift2_link_line2_crop = new canvas_line(329, 164, 329, 174, '#c00'),
							gift2_link_line3 = new canvas_rect(445, 98, 30, 4, null, null, null, '#c00'),
							gift2_link_line3_crop = new canvas_line(415, 100, 445, 100, '#c00'),
							gift2_link_line4 = new canvas_rect(327, 8, 4, 25, null, null, null, '#c00'),
							gift2_link_line4_crop = new canvas_line(329, 33, 329, 43, '#c00'),

							gift3_crop_array = new Array,
							gift3_link_line1 = new canvas_rect(183, 268, 15, 4, null, null, null, '#c00'),
							gift3_link_line1_crop = new canvas_line(198, 270, 208, 270, '#c00'),
							gift3_link_line2 = new canvas_rect(262, 327, 4, 8, null, null, null, '#c00'),
							gift3_link_line2_crop = new canvas_line(264, 315, 264, 327, '#c00'),
							gift3_link_line3 = new canvas_rect(329, 268, 17, 4, null, null, null, '#c00'),
							gift3_link_line3_crop = new canvas_line(320, 270, 329, 270, '#c00'),

							gift4_crop_array = new Array,
							gift4_link_line1 = new canvas_rect(183, 418, 20, 4, null, null, null, '#c00'),
							gift4_link_line1_crop = new canvas_line(203, 420, 222, 420, '#c00'),
							gift4_link_line2 = new canvas_rect(326, 418, 17, 4, null, null, null, '#c00'),
							gift4_link_line2_crop = new canvas_line(295, 420, 326, 420, '#c00'),
							gift4_link_line3 = new canvas_rect(262, 339, 4, 13, null, null, null, '#c00'),
							gift4_link_line3_crop = new canvas_line(264, 352, 264, 361, '#c00'),

							gift5_crop_array = new Array,
							gift5_link_line1 = new canvas_rect(348, 418, 20, 4, null, null, null, '#c00'),
							gift5_link_line1_crop = new canvas_line(368, 420, 382, 420, '#c00'),
							gift5_link_line2 = new canvas_rect(411, 503, 4, 13, null, null, null, '#c00'),
							gift5_link_line2_crop = new canvas_line(413, 493, 413, 503, '#c00'),
							gift5_link_line3 = new canvas_rect(454, 418, 21, 4, null, null, null, '#c00'),
							gift5_link_line3_crop = new canvas_line(440, 420, 454, 420, '#c00'),
							gift5_link_line4 = new canvas_rect(454, 289, 21, 4, null, null, null, '#c00'),
							gift5_link_line4_crop = new canvas_line(442, 291, 454, 291, '#c00'),

							gift6_crop_array = new Array,
							gift6_link_line1 = new canvas_rect(8, 504, 20, 4, null, null, null, '#c00'),
							gift6_link_line1_crop = new canvas_line(28, 506, 39, 506, '#c00'),
							gift6_link_line2 = new canvas_rect(50, 649, 4, 20, null, null, null, '#c00'),
							gift6_link_line2_crop = new canvas_line(52, 629, 52, 649, '#c00'),
							gift6_link_line3 = new canvas_rect(132, 649, 4, 20, null, null, null, '#c00'),
							gift6_link_line3_crop = new canvas_line(134, 629, 134, 649, '#c00'),
							gift6_link_line4 = new canvas_rect(159, 504, 19, 4, null, null, null, '#c00'),
							gift6_link_line4_crop = new canvas_line(149, 506, 159, 506, '#c00'),
							gift6_link_line5 = new canvas_rect(91, 368, 4, 14, null, null, null, '#c00'),
							gift6_link_line5_crop = new canvas_line(93, 382, 93, 393, '#c00'),

							gift7_crop_array = new Array,
							gift7_link_line1 = new canvas_rect(183, 583, 23, 4, null, null, null, '#c00'),
							gift7_link_line1_crop = new canvas_line(206, 585, 232, 585, '#c00'),
							gift7_link_line2 = new canvas_rect(318, 583, 25, 4, null, null, null, '#c00'),
							gift7_link_line2_crop = new canvas_line(297, 585, 318, 585, '#c00'),
							gift7_link_line3 = new canvas_rect(262, 484, 4, 11, null, null, null, '#c00'),
							gift7_link_line3_crop = new canvas_line(264, 495, 264, 505, '#c00'),

							gift8_crop_array = new Array,
							gift8_link_line1 = new canvas_rect(348, 605, 10, 4, null, null, null, '#c00'),
							gift8_link_line1_crop = new canvas_line(358, 607, 363, 607, '#c00'),
							gift8_link_line2 = new canvas_rect(411, 651, 4, 18, null, null, null, '#c00'),
							gift8_link_line2_crop = new canvas_line(413, 642, 413, 651, '#c00'),
							gift8_link_line3 = new canvas_rect(465, 605, 10, 4, null, null, null, '#c00'),
							gift8_link_line3_crop = new canvas_line(459, 607, 465, 607, '#c00'),
							gift8_link_line4 = new canvas_rect(411, 548, 4, 18, null, null, null, '#c00'),
							gift8_link_line4_crop = new canvas_line(413, 566, 413, 575, '#c00'),

							gift_array = new Array;
							gift1 = new canvas_image2(33, 61, 119, 239, 0, imageObject.gift1, 'gift1_popup'),
							gift2 = new canvas_image(220, 39, imageObject.gift2, 'gift2_popup'),
							gift3 = new canvas_image(208, 240, imageObject.gift3, 'gift3_popup'),
							gift4 = new canvas_image(221, 361, imageObject.gift4, 'gift4_popup'),
							gift5 = new canvas_image(380, 236, imageObject.gift5, 'gift5_popup'),
							gift6 = new canvas_image(38, 393, imageObject.gift6, 'gift6_popup'),
							gift7 = new canvas_image(230, 505, imageObject.gift7, 'gift7_popup'),
							gift8 = new canvas_image(363, 575, imageObject.gift8, 'gift8_popup');

						gift1_crop_array.push(gift1_link_line1_crop);
						gift1_crop_array.push(gift1_link_line2_crop);
						gift1_crop_array.push(gift1_link_line3_crop);
						gift1_crop_array.push(gift1_link_line4_crop);
						gift1_crop_array.push(gift1_link_line5_crop);

						gift2_crop_array.push(gift2_link_line1_crop);
						gift2_crop_array.push(gift2_link_line2_crop);
						gift2_crop_array.push(gift2_link_line3_crop);
						gift2_crop_array.push(gift2_link_line4_crop);

						gift3_crop_array.push(gift3_link_line1_crop);
						gift3_crop_array.push(gift3_link_line2_crop);
						gift3_crop_array.push(gift3_link_line3_crop);

						gift4_crop_array.push(gift4_link_line1_crop);
						gift4_crop_array.push(gift4_link_line2_crop);
						gift4_crop_array.push(gift4_link_line3_crop);

						gift5_crop_array.push(gift5_link_line1_crop);
						gift5_crop_array.push(gift5_link_line2_crop);
						gift5_crop_array.push(gift5_link_line3_crop);
						gift5_crop_array.push(gift5_link_line4_crop);
						
						gift6_crop_array.push(gift6_link_line1_crop);
						gift6_crop_array.push(gift6_link_line2_crop);
						gift6_crop_array.push(gift6_link_line3_crop);
						gift6_crop_array.push(gift6_link_line4_crop);
						gift6_crop_array.push(gift6_link_line5_crop);
						
						gift7_crop_array.push(gift7_link_line1_crop);
						gift7_crop_array.push(gift7_link_line2_crop);
						gift7_crop_array.push(gift7_link_line3_crop);
						
						gift8_crop_array.push(gift8_link_line1_crop);
						gift8_crop_array.push(gift8_link_line2_crop);
						gift8_crop_array.push(gift8_link_line3_crop);
						gift8_crop_array.push(gift8_link_line4_crop);

						gift_array.push(gift1);
						gift_array.push(gift2);
						gift_array.push(gift3);
						gift_array.push(gift4);
						gift_array.push(gift5);
						gift_array.push(gift6);
						gift_array.push(gift7);
						gift_array.push(gift8);

						function draw_obj() {
							gift1_link_line1_crop.stroke(context);
							gift1_link_line2_crop.stroke(context);
							gift1_link_line3_crop.stroke(context);
							gift1_link_line4_crop.stroke(context);
							gift1_link_line5_crop.stroke(context);

							gift2_link_line1_crop.stroke(context);
							gift2_link_line2_crop.stroke(context);
							gift2_link_line3_crop.stroke(context);
							gift2_link_line4_crop.stroke(context);

							gift3_link_line1_crop.stroke(context);
							gift3_link_line2_crop.stroke(context);
							gift3_link_line3_crop.stroke(context);

							gift4_link_line1_crop.stroke(context);
							gift4_link_line2_crop.stroke(context);
							gift4_link_line3_crop.stroke(context);

							gift5_link_line1_crop.stroke(context);
							gift5_link_line2_crop.stroke(context);
							gift5_link_line3_crop.stroke(context);
							gift5_link_line4_crop.stroke(context);

							gift6_link_line1_crop.stroke(context);
							gift6_link_line2_crop.stroke(context);
							gift6_link_line3_crop.stroke(context);
							gift6_link_line4_crop.stroke(context);
							gift6_link_line5_crop.stroke(context);

							gift7_link_line1_crop.stroke(context);
							gift7_link_line2_crop.stroke(context);
							gift7_link_line3_crop.stroke(context);

							gift8_link_line1_crop.stroke(context);
							gift8_link_line2_crop.stroke(context);
							gift8_link_line3_crop.stroke(context);
							gift8_link_line4_crop.stroke(context);

							border.fill(context);

							tips1.fill(context);
							tips1Text.draw(context);
							tips2.fill(context);
							tips2Text.draw(context);
							tips3.fill(context);
							tips3Text.draw(context);
							tips4.fill(context);
							tips4Text.draw(context);
							tips5.fill(context);
							tips5Text.draw(context);

							group_border1.fill(context);
							group_border2.fill(context);
							group_border3.fill(context);
							group_border4.fill(context);

							group_crop_line1.stroke(context);
							group_crop_line2.stroke(context);
							group_crop_line3.stroke(context);

							gift1_link_line1.fill(context);
							gift1_link_line2.fill(context);
							gift1_link_line3.fill(context);
							gift1_link_line4.fill(context);
							gift1_link_line5.fill(context);

							gift2_link_line1.fill(context);
							gift2_link_line2.fill(context);
							gift2_link_line3.fill(context);
							gift2_link_line4.fill(context);

							gift3_link_line1.fill(context);
							gift3_link_line2.fill(context);
							gift3_link_line3.fill(context);

							gift4_link_line1.fill(context);
							gift4_link_line2.fill(context);
							gift4_link_line3.fill(context);

							gift5_link_line1.fill(context);
							gift5_link_line2.fill(context);
							gift5_link_line3.fill(context);
							gift5_link_line4.fill(context);

							gift6_link_line1.fill(context);
							gift6_link_line2.fill(context);
							gift6_link_line3.fill(context);
							gift6_link_line4.fill(context);
							gift6_link_line5.fill(context);

							gift7_link_line1.fill(context);
							gift7_link_line2.fill(context);
							gift7_link_line3.fill(context);

							gift8_link_line1.fill(context);
							gift8_link_line2.fill(context);
							gift8_link_line3.fill(context);
							gift8_link_line4.fill(context);

							gift2.draw2(context);
							gift3.draw2(context);
							gift4.draw2(context);
							gift5.draw2(context);
							gift6.draw2(context);
							gift7.draw2(context);
							gift8.draw2(context);
						}

						var lastTime = 0,
							lastTime2 = 0,
							delay = 50,
							delay2 = 2500,
							gift1_animationFrame;
						function gift1_animate_auto(date) {
							if (date - lastTime2 > delay2 && date - lastTime > delay) {
								lastTime = date;
								gift1.index = (gift1.index + 1) % 8;
								if (gift1.index % 8 == 7) lastTime2 = date;
							}
							gift1.draw2(context);
							gift1_animationFrame = window.requestAnimationFrame(function() {
								gift1_animate_auto(new Date);
							});
						}

						function gift1_animate_manually(date) {
							if (date - lastTime2 > delay2 && date - lastTime > delay) {
								lastTime = date;
								gift1.index = (gift1.index + 1) % 8;
								if (gift1.index % 8 == 7) lastTime2 = date;
							}
							gift1.draw2(context);
						}

						function hide_animate(t, popupid, gift_array) {
							context.clearRect(0, 0, canvas.width, canvas.height);

							gift_array.forEach(function(gift) {
								gift.is_animate = true;
								if (t <= 0) gift.is_draw = false;
							});
							draw_obj();
							gift1_animate_manually(new Date);

							if (t <= 0) {
								is_playing = false;
								document.getElementById(popupid).showObject();
								gift1_animate_auto(new Date);
								window.cancelAnimationFrame(animationFrame);
							} else {
								animationFrame = window.requestAnimationFrame(function() {
									hide_animate(t -= 0.05, popupid, gift_array);
								});
							}
						}

						draw_obj();
						gift1_animate_auto(new Date);

						var is_playing = false,
							animationFrame;
						canvas.addEventListener('touchend', function(e) {
							if (is_playing) return;
							var loc = windowToCanvas(canvas, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
							gift_array.forEach(function(gift, index) {
								gift.path2(context);
								if (context.isPointInPath(loc.x, loc.y)) {
									if (gift.is_touched)
										document.getElementById(gift.popupid).showObject();
									else {
										is_playing = true;
										gift.is_touched = true;
										window.cancelAnimationFrame(gift1_animationFrame);
										hide_animate(1, gift.popupid, function(ind) {
											switch (ind) {
												case 0: return gift1_crop_array; break;
												case 1: return gift2_crop_array; break;
												case 2: return gift3_crop_array; break;
												case 3: return gift4_crop_array; break;
												case 4: return gift5_crop_array; break;
												case 5: return gift6_crop_array; break;
												case 6: return gift7_crop_array; break;
												case 7: return gift8_crop_array; break;
											}
										}(index));
									}
								}
							});
						});
					}
				}
			}
			image.src = imagesPath + images[ind];
		})(i);
	}
})();

;(function() {
	var images = ['mgm_g1_a.png','mgm_g1_b.png','mgm_g2_a.png','mgm_g2_b.png','mgm_g3_a.png','mgm_g3_b.png','mgm_g4_a.png','mgm_g4_b.png','mgm_g5_a.png','mgm_g5_b.png','mgm_people_a.png','mgm_people_b.png','mgm_dtext1.png','mgm_dtext2.png','mgm_dtext3.png','mgm_dtext4.png','mgm_dtext5.png'],
		imageObject = new Object,
		imageLoadedOk = 0;

	for (var i = 0; i < images.length; i++) {
		(function(ind) {
			var image = new Image;
			image.onload = function() {
				imageObject[this.src.replace(/.+mgm_(\w+)\.(png|jpg)/i, '$1')] = this;
				if (++imageLoadedOk >= images.length) {
					var canvas = document.getElementById('mgm_detail');
					if (canvas) {
						var success_count = parseInt(document.getElementById('block3_count').innerHTML, 10),
							context = canvas.getContext('2d'),
							gift1 = new canvas_image(206, 69, imageObject.g1_a),
							gift2 = new canvas_image(312, 12, imageObject.g2_a),
							gift3 = new canvas_image(401, 56, imageObject.g3_a),
							gift4 = new canvas_image(496, 0, imageObject.g4_a),
							gift5 = new canvas_image(590, 59, imageObject.g5_a),
							line1 = new canvas_line(116, 167, 229, 167, '#cccccc'),
							line2 = new canvas_line(116, 261, 322, 261, '#cccccc'),
							line3 = new canvas_line(116, 344, 416, 344, '#cccccc'),
							line4 = new canvas_line(116, 432, 508, 432, '#cccccc'),
							line5 = new canvas_line(116, 517, 601, 517, '#cccccc'),
							rect1 = new canvas_rect(204, 127, 80, 75, null, null, null, 'rgba(204,0,0,0.2)'),
							rect2 = new canvas_rect(301, 127, 80, 166, null, null, null, 'rgba(204,0,0,0.2)'),
							rect3 = new canvas_rect(398, 127, 80, 250, null, null, null, 'rgba(204,0,0,0.2)'),
							rect4 = new canvas_rect(494, 127, 80, 336, null, null, null, 'rgba(204,0,0,0.2)'),
							rect5 = new canvas_rect(591, 127, 80, 420, null, null, null, 'rgba(204,0,0,0.2)'),
							text1 = new canvas_image(0, 176, imageObject.dtext1),
							text2 = new canvas_image(0, 263, imageObject.dtext2),
							text3 = new canvas_image(0, 347, imageObject.dtext3),
							text4 = new canvas_image(0, 434, imageObject.dtext4),
							text5 = new canvas_image(0, 518, imageObject.dtext5),
							peoplePos = [
								{x: 103, y: 141},
								{x: 103, y: 227}, {x: 143, y: 227},
								{x: 103, y: 312}, {x: 143, y: 312}, {x: 183, y: 312},
								{x: 103, y: 398}, {x: 143, y: 398}, {x: 183, y: 398}, {x: 221, y: 398}, {x: 261, y: 398}, {x: 300, y: 398}, {x: 339, y: 398}, {x: 379, y: 398}, {x: 418, y: 398},
								{x: 103, y: 483}, {x: 133, y: 483}, {x: 163, y: 483}, {x: 193, y: 483}, {x: 223, y: 483}, {x: 253, y: 483}, {x: 283, y: 483}, {x: 313, y: 483}, {x: 343, y: 483}, {x: 373, y: 483}, {x: 403, y: 483}, {x: 433, y: 483}, {x: 463, y: 483}, {x: 493, y: 483}, {x: 523, y: 483}
							];

						var people = new Array;
						for (var i = 0; i < peoplePos.length; i++) {
							if (i + 1 <= success_count)
								people.push(new canvas_image(peoplePos[i].x, peoplePos[i].y, imageObject.people_b));
							else
								people.push(new canvas_image(peoplePos[i].x, peoplePos[i].y, imageObject.people_a));
						}

						if (success_count >= 1) {
							gift1.image = imageObject.g1_b;
							line1.strokeStyle = '#222222';
							rect1.fillStyle = '#cc0000';
						}
						if (success_count >= 3) {
							gift2.image = imageObject.g2_b;
							line2.strokeStyle = '#222222';
							rect2.fillStyle = '#cc0000';
						}
						if (success_count >= 6) {
							gift3.image = imageObject.g3_b;
							line3.strokeStyle = '#222222';
							rect3.fillStyle = '#cc0000';
						}
						if (success_count >= 15) {
							gift4.image = imageObject.g4_b;
							line4.strokeStyle = '#222222';
							rect4.fillStyle = '#cc0000';
						}
						if (success_count >= 30) {
							gift5.image = imageObject.g5_b;
							line5.strokeStyle = '#222222';
							rect5.fillStyle = '#cc0000';
						}

						gift1.draw2(context);
						gift2.draw2(context);
						gift3.draw2(context);
						gift4.draw2(context);
						gift5.draw2(context);
						text1.draw2(context);
						text2.draw2(context);
						text3.draw2(context);
						text4.draw2(context);
						text5.draw2(context);
						rect1.fill(context);
						rect2.fill(context);
						rect3.fill(context);
						rect4.fill(context);
						rect5.fill(context);
						line1.stroke(context);
						line2.stroke(context);
						line3.stroke(context);
						line4.stroke(context);
						line5.stroke(context);
						people.forEach(function(p) {
							p.draw2(context);
						})
					}
				}
			}
			image.src = imagesPath + images[ind];
		})(i);
	}
})();

var card_show_index = 0,
	card_is_playing = false;
function prev_card() {
	if (card_is_playing || card_show_index == 0) return;
	card_is_playing = true;

	document.getElementsByClassName('mgm_card_info')[card_show_index--].addClassName('next');
	document.getElementsByClassName('mgm_card_info')[card_show_index].removeClassName('prev');

	if (card_show_index == 0)
		document.getElementById('mgm_prev_card').hideObject();
	else {
		document.getElementById('mgm_prev_card').showObject();
		document.getElementById('mgm_next_card').showObject();
	}
	window.setTimeout(function() {
		card_is_playing = false;
	}, 500);
}
function next_card() {
	if (card_is_playing || card_show_index == 3) return;
	card_is_playing = true;

	document.getElementsByClassName('mgm_card_info')[card_show_index++].addClassName('prev');
	document.getElementsByClassName('mgm_card_info')[card_show_index].removeClassName('next');

	if (card_show_index == 3)
		document.getElementById('mgm_next_card').hideObject();
	else {
		document.getElementById('mgm_prev_card').showObject();
		document.getElementById('mgm_next_card').showObject();
	}
	window.setTimeout(function() {
		card_is_playing = false;
	}, 500);
}

function set_size() {
	var body = document.body || document.documentElement,
		contentWidth = parseInt(body.offsetWidth);
	body.style.fontSize = (contentWidth >= 750 ? 28 : (contentWidth / 750 * 28)) + 'px';

	var mgm_card_detail = document.getElementById('mgm_card_detail');
	if (mgm_card_detail) {
		mgm_card_detail.setStyle({height: (document.body.offsetHeight - document.getElementById('mgm_card_header').offsetHeight) + 'px'});
	}
}
window.onresize = set_size;
set_size();