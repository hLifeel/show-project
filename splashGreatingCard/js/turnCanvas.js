function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}

function canvasApp() {
    if (!canvasSupport()) {
        return
    }

    var outScreen = document.getElementsByClassName('out_holder'),
        pageMum = outScreen.length;

    var ctx = document.getElementById('turntableCanvas').getContext('2d'),
        canvas = document.getElementById('turntableCanvas');
    var bgctx = document.getElementById('bg_canvas').getContext('2d');
    var proctx = document.getElementById('packet_profile').getContext('2d'),
        proctxCanvas = document.getElementById('packet_profile');
    ctx.translate(375, 375);
    bgctx.translate(375, 375);
    proctx.translate(115, 149);

    var imageLoadFinishCount = 0,
        imageLoadFinishArray = new Array(),
        pointArray = new Array(),
        profileArray = new Array(),
        pocketProfileArray = new Array(),
        touchx,
        touchendx,
        isMoving = false,
        angleStep = 1 * Math.PI / 120,
        scaleStep = 1 / 25,
        alphaStep = 1 / 20,
        rotateCount = 0,
        partNumber = 12,
        maxRotateCount = 20,
        animationFrame,
        index = 0,
        imageLoadProFinishCount = 0,
        imageLoadProFinishArray = new Array(),
        imgPath = 'images/';
    var turnProfileSrc = [
        imgPath + 'turntable_dog_profile1.png',
        imgPath + 'turntable_dog_profile2.png',
        imgPath + 'turntable_dog_profile3.png',
        imgPath + 'turntable_dog_profile4.png',
        imgPath + 'turntable_dog_profile5.png',
        imgPath + 'turntable_dog_profile6.png',
        imgPath + 'turntable_dog_profile1.png',
        imgPath + 'turntable_dog_profile2.png',
        imgPath + 'turntable_dog_profile3.png',
        imgPath + 'turntable_dog_profile4.png',
        imgPath + 'turntable_dog_profile5.png',
        imgPath + 'turntable_dog_profile6.png'
    ];
    var packetProfileSrc = [
        imgPath + 'packet_dog_profile1.png',
        imgPath + 'packet_dog_profile2.png',
        imgPath + 'packet_dog_profile3.png',
        imgPath + 'packet_dog_profile4.png',
        imgPath + 'packet_dog_profile5.png',
        imgPath + 'packet_dog_profile6.png'
    ];

    (function () {
        /*大外圈*/
        bgctx.fillStyle = '#EFBC7E';
        bgctx.beginPath();
        bgctx.arc(0, 0, 300, 0, 2 * Math.PI, true);
        bgctx.closePath();
        bgctx.fill();

        /*内圈*/
        bgctx.fillStyle = '#FE4B44';
        bgctx.beginPath();
        bgctx.arc(0, 0, 260, 0, 2 * Math.PI, true);
        bgctx.closePath();
        bgctx.fill();

        /*小内圈*/
        bgctx.strokeStyle = '#fff';
        bgctx.beginPath();
        bgctx.lineWidth = 4;
        bgctx.arc(0, 0, 190, 0, 2 * Math.PI, true);
        bgctx.closePath();
        bgctx.stroke();

        var TurnTable = function (x, y, rotateAngle, scaleRatio, src, selfAngle) {
            this.x = x;
            this.y = y;
            this.rotateAngle = rotateAngle;
            this.scaleRatio = scaleRatio;
            this.src = src;
            this.selfAngle = selfAngle;
        };
        TurnTable.prototype = {
            drawPoint: function (ctx, pointColor) {
                ctx.save();
                ctx.translate(this.x * Math.cos(this.rotateAngle), this.y * Math.sin(this.rotateAngle));
                ctx.fillStyle = pointColor || '#fff';
                ctx.scale(this.scaleRatio, this.scaleRatio);
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, 2 * Math.PI, true);//小白点半径10
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            },
            drawImg: function (ctx) {
                ctx.save();
                ctx.translate(this.x * Math.cos(this.rotateAngle), this.y * Math.sin(this.rotateAngle));
                ctx.rotate(this.selfAngle + Math.PI / 2);
                ctx.scale(this.scaleRatio, this.scaleRatio);
                ctx.drawImage(this.src, -40, -50);//轮盘头像宽80，高100
                ctx.restore();
            }
        };
        for (var i = 0; i < turnProfileSrc.length; i++) {
            (function (ind) {
                var image = new Image;
                image.onload = function () {
                    imageLoadFinishCount++;
                    imageLoadFinishArray[ind] = image;
                    if (imageLoadFinishCount == turnProfileSrc.length) {
                        for (var j = 0; j < 12; j++) {
                            var rotateR = j * Math.PI / 6 - Math.PI / 2;

                            var point = new TurnTable(192, 192, rotateR, 0.8);
                            var profile = new TurnTable(300, 300, rotateR, 0.8, imageLoadFinishArray[j], rotateR);
                            point.drawPoint(ctx);
                            profile.drawImg(ctx);

                            pointArray.push(point);
                            profileArray.push(profile);
                        }
                        pointArray[0].scaleRatio = 1.6;
                        pointArray[0].drawPoint(ctx, '#fee94e');
                        profileArray[0].scaleRatio = 1.6;
                        profileArray[0].drawImg(ctx);
                    }
                };
                image.src = turnProfileSrc[ind];
            })(i);
        }

        var PocketProfile = function (src, alpha) {
            this.src = src;
            this.alpha = alpha;
        };
        PocketProfile.prototype = {
            drawProfile: function () {
                proctx.save();
                proctx.globalAlpha = this.alpha;
                proctx.drawImage(this.src, -115, -149);//红包头像宽230，高298
                proctx.restore();
            }
        };
        for (var p = 0; p < packetProfileSrc.length; p++) {
            (function (ind) {
                var image = new Image;
                image.onload = function () {
                    imageLoadProFinishCount++;
                    imageLoadProFinishArray[ind] = image;
                    if (imageLoadProFinishCount == packetProfileSrc.length) {
                        for (var m = 0; m < 6; m++) {

                            var pocketProfile = new PocketProfile(imageLoadProFinishArray[m], 0);
                            pocketProfile.drawProfile(ctx);

                            pocketProfileArray.push(pocketProfile);
                        }
                        pocketProfileArray[0].alpha = 1;
                        pocketProfileArray[0].drawProfile(ctx);
                    }
                };
                image.src = packetProfileSrc[ind];
            })(p);
        }

        function rotateCircle(isClockwise, currentIndex, pindex) {
            ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            proctx.clearRect(-proctxCanvas.width / 2, -proctxCanvas.height / 2, proctxCanvas.width, proctxCanvas.height);
            pointArray.forEach(function (point) {
                if (isClockwise) {
                    point.rotateAngle -=angleStep;
                } else {
                    point.rotateAngle += angleStep;
                }
                point.drawPoint(ctx);
            });
            if (isClockwise) {
                pointArray[currentIndex].scaleRatio +=scaleStep;
                pointArray[currentIndex - 1 < 0 ? 11 : currentIndex - 1].scaleRatio -=scaleStep;
            } else {
                pointArray[currentIndex].scaleRatio +=scaleStep;
                pointArray[currentIndex + 1 >= 12 ? 0 : currentIndex + 1].scaleRatio -=scaleStep;
            }
            pointArray[currentIndex].drawPoint(ctx, '#fee94e');

            profileArray.forEach(function (profile) {
                if (isClockwise) {
                    profile.rotateAngle -=angleStep;
                    profile.selfAngle -=angleStep;
                } else {
                    profile.rotateAngle += angleStep;
                    profile.selfAngle += angleStep;
                }
                profile.drawImg(ctx);
            });
            if (isClockwise) {
                profileArray[currentIndex].scaleRatio +=scaleStep;
                profileArray[currentIndex - 1 < 0 ? 11 : currentIndex - 1].scaleRatio -=scaleStep;
            } else {
                profileArray[currentIndex].scaleRatio +=scaleStep;
                profileArray[currentIndex + 1 >= 12 ? 0 : currentIndex + 1].scaleRatio -=scaleStep;
            }
            profileArray[currentIndex].drawImg(ctx);

            if (isClockwise) {
                pocketProfileArray[pindex].alpha +=alphaStep;
                pocketProfileArray[pindex - 1 < 0 ? 5 : pindex - 1].alpha -=alphaStep;
            } else {
                pocketProfileArray[pindex].alpha +=alphaStep;
                pocketProfileArray[pindex + 1 >= 6 ? 0 : pindex + 1].alpha -=alphaStep;
            }
            pocketProfileArray[pindex].drawProfile(ctx);

            if (maxRotateCount == ++rotateCount) {
                rotateCount = 0;
                isMoving = false;
                window.cancelAnimationFrame(animationFrame);
            }
            else {
                animationFrame = window.requestAnimationFrame(function () {
                    rotateCircle(isClockwise, currentIndex, pindex);
                });
            }
        }

        for(var N=0;N<pageMum;N++){
            outScreen[N].ontouchstart = function (e) {
                touchx = touchendx = Number(e.changedTouches[0].clientX);
            };
            outScreen[N].ontouchmove = function (e) {
                e.preventDefault();
                touchendx = Number(e.changedTouches[0].clientX);
            };
            outScreen[N].ontouchend = function (e) {
                if (isMoving) return;
                var moveDistance = touchx - touchendx;
                if (moveDistance < -25) {
                    isMoving = true;
                    index--;
                    if (index < 0) index = partNumber - 1;
                    profileIndex = index % 6;
                    animationFrame = window.requestAnimationFrame(function () {
                        rotateCircle(false, index, profileIndex);
                    });
                } else if (moveDistance > 25) {
                    isMoving = true;
                    index++;
                    if (index >= partNumber) index = 0;
                    profileIndex = index % 6;
                    animationFrame = window.requestAnimationFrame(function () {
                        rotateCircle(true, index, profileIndex);
                    });
                }
            }
        }
    }());
}

window.onload = function () {
    canvasApp();
};