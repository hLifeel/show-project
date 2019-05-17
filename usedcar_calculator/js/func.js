/*Vue Code*/
(function () {
    var calculator = new Vue({
        el: '#calculator',
        data: {
            dataArray: {
                a1: "",
                a2: "",
                a3: "",
                a4: "",
                a5: "",
                a6: "",
                a7: "",
                a8: "",
                a9: "",
                a10: ""
            },
            tag: [
                {
                    model: 'G410',
                    emission: [
                        {
                            e: '国五',
                            SpecificationList: [
                                {
                                    info: 'A4x2NA 20N Opc RET White 2.71 disc 3.75m 700W 500W',
                                    price: 743675,
                                    value: 0.9
                                },
                                {
                                    info: 'A4x2NA 20N Opc RET White 2.71 disc 3.95m 700W 600W',
                                    price: 743675,
                                    value: 0.9
                                },
                                {
                                    info: 'A4x2NA 20N Opc RET Blue 2.71 disc 3.95m 700W 600W',
                                    price: 743675,
                                    value: 0.9
                                },
                                {
                                    info: 'A6x4NA 20N Opc RET White 3.07 disc 3.35m 400W FL',
                                    price: 894341,
                                    value: 1
                                }
                            ]
                        },
                        {
                            e: '国六',
                            SpecificationList: [
                                {
                                    info: 'A4x2NA 20N Opc RET White 2.71 disc 3.75m 700W 500W',
                                    price: 764035,
                                    value: 0.9
                                }
                            ]
                        }
                    ]
                },
                {
                    model: 'G450',
                    emission: [
                        {
                            e: '国五',
                            SpecificationList: [
                                {
                                    info: 'A6x2NA 20N Opc RET White 2.71 disc 3.35m 500W 500W',
                                    price: 824803,
                                    value: 1
                                },
                                {
                                    info: 'A6x2NA 20N Opc RET White 2.92 disc 3.35m 500W 500W',
                                    price: 824803,
                                    value: 1
                                },
                                {
                                    info: 'A6x2NA 20H Opc RET White 2.71 disc 3.35m 500W 500W',
                                    price: 849036,
                                    value: 1
                                },
                                {
                                    info: 'A6x2NA 20H Opc RET White 2.92 disc 3.35m 500W 500W',
                                    price: 849036,
                                    value: 1
                                },
                                {
                                    info: 'A6x4NA 20H Opc RET White 2.92 disc 3.35m 400W 500W',
                                    price: 891180,
                                    value: 1
                                },
                                {
                                    info: 'A6x4NA 20H Opc RET White 2.92 disc 3.35m 400W FL',
                                    price: 922788,
                                    value: 1
                                }
                            ]
                        },
                        {
                            e: '国六',
                            SpecificationList: [
                                {
                                    info: 'A6x2NA 20N Opc RET White 2.71 disc 3.35m 500W 500W',
                                    price: 845162,
                                    value: 1
                                },
                                {
                                    info: 'A6x2NA 20H Opc RET White 2.71 disc 3.35m 500W 500W',
                                    price: 879575,
                                    value: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    model: 'G500',
                    emission: [
                        {
                            e: '国五',
                            SpecificationList: [
                                {
                                    info: 'A6x2NA 20H Opc RET White 2.71 disc 3.35m 500W 500W',
                                    price: 870413,
                                    value: 1
                                },
                                {
                                    info: 'A6x4NA 20H Opc RET White 2.92 disc 3.35m 400W 500W',
                                    price: 911539,
                                    value: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    model: 'R450',
                    emission: [
                        {
                            e: '国五',
                            SpecificationList: [
                                {
                                    info: 'A6x2NA 20H Opc RET White 2.71 disc 3.35m 500W 500W +S',
                                    price: 895247,
                                    value: 1
                                },
                                {
                                    info: 'A6x2NA 20H Opc RET White 2.92 disc 3.35m 500W 500W +S',
                                    price: 895247,
                                    value: 1
                                }
                            ]
                        },
                        {
                            e: '国六',
                            SpecificationList: [
                                {
                                    info: 'A6x2NA 20H Opc RET White 2.71 disc 3.35m 500W 500W +S',
                                    price: 915607,
                                    value: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    model: 'S500',
                    emission: [
                        {
                            e: '国五',
                            SpecificationList: [
                                {
                                    info: 'A6x2NA 20H Opc RET Red 2.71 disc 3.35m 500W 500W +S',
                                    price: 985847,
                                    value: 1
                                }
                            ]
                        }
                    ]
                }
            ],
            cansub: true,
            disableEmission: true,
            emissionList: [],
            disableSpecification: true,
            SpecificList: [],
            spe: 0,
            priceTag: 0,
            asPrice: 0,
            totalPrice: 0,
            rate: 0,
            partRollNumber: [[]],
            jsonStr: "",
        },
        mounted: function () {
            var _this = this;
            (function () {
                if (typeof inputStr != 'undefined') {
                    var temObj = JSON.parse(inputStr);
                    Object.keys(temObj).forEach(function (key) {
                        _this.dataArray[key] = temObj[key];
                    });
                }
            }());
        },
        methods: {
            calculate: function () {
                var shopPrice, salePrice, keepVal, standPrice, operation, maintain, specification;
                var year, mile;
                year = Number(this.dataArray.a10);
                (function (b) {
                    if (b > 0 && b < 15 * 1e4) mile = 0;
                    else if (b >= 15 * 1e4 && b < 16 * 1e4) mile = 1;
                    else if (b >= 16 * 1e4 && b < 17 * 1e4) mile = 2;
                    else if (b >= 17 * 1e4 && b < 18 * 1e4) mile = 3;
                    else if (b >= 18 * 1e4 && b < 19 * 1e4) mile = 4;
                    else if (b >= 19 * 1e4 && b < 20 * 1e4) mile = 5;
                    else if (b >= 20 * 1e4 && b < 21 * 1e4) mile = 6;
                    else if (b >= 21 * 1e4 && b < 22 * 1e4) mile = 7;
                    else if (b >= 22 * 1e4 && b < 23 * 1e4) mile = 8;
                    else if (b >= 23 * 1e4 && b < 24 * 1e4) mile = 9;
                    else if (b >= 24 * 1e4 && b < 25 * 1e4) mile = 10;
                    else if (b >= 25 * 1e4 && b < 26 * 1e4) mile = 11;
                    else if (b >= 26 * 1e4 && b < 27 * 1e4) mile = 12;
                    else if (b >= 27 * 1e4 && b < 28 * 1e4) mile = 13;
                    else if (b >= 28 * 1e4 && b < 29 * 1e4) mile = 14;
                    else if (b >= 29 * 1e4 && b < 30 * 1e4) mile = 15;
                    else if (b >= 30 * 1e4 && b < 31 * 1e4) mile = 16;
                    else if (b >= 31 * 1e4 && b < 32 * 1e4) mile = 17;
                    else if (b >= 32 * 1e4 && b < 33 * 1e4) mile = 18;
                    else if (b >= 33 * 1e4 && b < 34 * 1e4) mile = 19;
                    else if (b >= 34 * 1e4 && b < 35 * 1e4) mile = 20;
                    else if (b >= 35 * 1e4 && b < 36 * 1e4) mile = 21;
                    else if (b >= 36 * 1e4 && b < 37 * 1e4) mile = 22;
                    else if (b >= 37 * 1e4 && b < 38 * 1e4) mile = 23;
                    else if (b >= 38 * 1e4 && b < 39 * 1e4) mile = 24;
                    else if (b >= 39 * 1e4 && b < 40 * 1e4) mile = 25;
                    else if (b >= 40) mile = 26;
                }(this.dataArray.a8));
                shopPrice = this.priceTag;
                salePrice = this.dataArray.a6;
                keepVal = this.dataArray.a5 == '' ? 0 : this.dataArray.a5;
                switch (year) {
                    case 1:
                        standPrice = [0.7646842105263160, 0.7646842105263160, 0.7626842105263160, 0.7606842105263160, 0.7586842105263160, 0.7566842105263160, 0.7546842105263160, 0.7526842105263160, 0.7506842105263160, 0.7486842105263160, 0.7466842105263160, 0.7446842105263160, 0.7386842105263160, 0.7326842105263160, 0.7266842105263160, 0.7206842105263160, 0.7146842105263160, 0.7126842105263160, 0.7106842105263160, 0.7086842105263160, 0.7066842105263160, 0.7046842105263160, 0.7026842105263160, 0.7006842105263160, 0.6986842105263160, 0.6966842105263160, 0.6946842105263160][mile];
                        break;
                    case 2:
                        standPrice = [0.6529815789473680, 0.6529815789473680, 0.6509815789473680, 0.6489815789473680, 0.6469815789473680, 0.6449815789473680, 0.6429815789473690, 0.6409815789473690, 0.6389815789473690, 0.6369815789473690, 0.6349815789473690, 0.6329815789473690, 0.6259815789473690, 0.6189815789473690, 0.6119815789473690, 0.6049815789473690, 0.5979815789473680, 0.5929815789473680, 0.5879815789473680, 0.5829815789473680, 0.5779815789473680, 0.5729815789473680, 0.5709815789473680, 0.5689815789473680, 0.5669815789473680, 0.5649815789473680, 0.5629815789473680][mile];
                        break;
                    case 3:
                        standPrice = [0.5422098026315790, 0.5422098026315790, 0.5402098026315790, 0.5382098026315790, 0.5362098026315790, 0.5342098026315790, 0.5322098026315790, 0.5302098026315790, 0.5282098026315790, 0.5262098026315790, 0.5242098026315790, 0.5222098026315790, 0.5142098026315790, 0.5062098026315790, 0.4982098026315790, 0.4902098026315790, 0.4822098026315790, 0.4742098026315790, 0.4662098026315790, 0.4582098026315790, 0.4502098026315790, 0.4422098026315790, 0.4382098026315790, 0.4342098026315790, 0.4302098026315790, 0.4262098026315790, 0.4222098026315790][mile];
                        break;
                    case 4:
                        standPrice = [0.4377678421052630, 0.4377678421052630, 0.4357678421052630, 0.4337678421052630, 0.4317678421052630, 0.4297678421052630, 0.4277678421052630, 0.4257678421052630, 0.4237678421052630, 0.4217678421052630, 0.4197678421052630, 0.4177678421052630, 0.4097678421052630, 0.4017678421052630, 0.3937678421052630, 0.3857678421052630, 0.3777678421052630, 0.3697678421052630, 0.3617678421052630, 0.3537678421052630, 0.3457678421052630, 0.3377678421052630, 0.3337678421052630, 0.3297678421052630, 0.3257678421052630, 0.3217678421052630, 0.3177678421052630][mile];
                        break;
                    case 5:
                        standPrice = [0.3437700776315790, 0.3437700776315790, 0.3417700776315790, 0.3397700776315790, 0.3377700776315790, 0.3357700776315790, 0.3337700776315790, 0.3317700776315790, 0.3297700776315790, 0.3277700776315790, 0.3257700776315790, 0.3237700776315790, 0.3157700776315790, 0.3077700776315790, 0.2997700776315790, 0.2917700776315790, 0.2837700776315790, 0.2757700776315790, 0.2677700776315790, 0.2597700776315790, 0.2517700776315790, 0.2437700776315790, 0.2397700776315790, 0.2357700776315790, 0.2317700776315790, 0.2277700776315790, 0.2237700776315790][mile];
                        break;
                    case 6:
                        standPrice = [0.2628275582236840, 0.2628275582236840, 0.2608275582236840, 0.2588275582236840, 0.2568275582236840, 0.2548275582236840, 0.2528275582236840, 0.2508275582236840, 0.2488275582236840, 0.2468275582236840, 0.2448275582236840, 0.2428275582236840, 0.2348275582236840, 0.2268275582236840, 0.2188275582236840, 0.2108275582236840, 0.2028275582236840, 0.1948275582236840, 0.1868275582236840, 0.1788275582236840, 0.1708275582236840, 0.1628275582236840, 0.1588275582236840, 0.1548275582236840, 0.1508275582236840, 0.1468275582236840, 0.1428275582236840][mile];
                        break;
                    case 7:
                        standPrice = [0.1960499797121710, 0.1960499797121710, 0.1940499797121710, 0.1920499797121710, 0.1900499797121710, 0.1880499797121710, 0.1860499797121710, 0.1840499797121710, 0.1820499797121710, 0.1800499797121710, 0.1780499797121710, 0.1760499797121710, 0.1680499797121710, 0.1600499797121710, 0.1520499797121710, 0.1440499797121710, 0.1360499797121710, 0.1280499797121710, 0.1200499797121710, 0.1120499797121710, 0.1040499797121710, 0.0960499797121710, 0.0920499797121710, 0.0880499797121710, 0.0840499797121710, 0.0800499797121710, 0.0760499797121710][mile];
                        break;
                    case 8:
                        standPrice = [0.1432349857985200, 0.1432349857985200, 0.1412349857985200, 0.1392349857985200, 0.1372349857985200, 0.1352349857985200, 0.1332349857985200, 0.1312349857985200, 0.1292349857985200, 0.1272349857985200, 0.1252349857985200, 0.1232349857985200, 0.1152349857985200, 0.1072349857985200, 0.0992349857985198, 0.0912349857985198, 0.0832349857985197, 0.0752349857985197, 0.0672349857985197, 0.0592349857985197, 0.0512349857985197, 0.0432349857985197, 0.0392349857985197, 0.0352349857985197, 0.0312349857985197, 0.0272349857985197, 0.0232349857985197][mile];
                        break;
                }
                switch (this.dataArray.a9) {
                    case '长途运输':
                        operation = [0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95][year - 1];
                        break;
                    case '危险品':
                        operation = [0.75, 0.75, 0.75, 0.75, 0.75, 0.7, 0.7, 0][year - 1];
                        break;
                }
                switch (this.dataArray.a7) {
                    case '大包':
                        maintain = 1.05;
                        break;
                    case '保养':
                        maintain = 1;
                        break;
                    case '无':
                        maintain = 0.9;
                        break;
                }
                specification = Number(this.spe);

                var price = (((shopPrice - keepVal) * standPrice * operation * maintain * specification - 20000) / 100).toFixed() * 100;
                this.asPrice = price.toString().replace(/\B(?=(\d{3})+$)/g, ',');
                this.totalPrice = (price * this.dataArray.a4).toString().replace(/\B(?=(\d{3})+$)/g, ',');
                this.rate = (price * 100 / salePrice).toFixed(1);

                console.log(shopPrice, salePrice, keepVal, standPrice, operation, maintain, specification, year, mile);
                this.draw().drawResult();
            },
            checkForm: function (val) {
                var okNum = 0;
                this.cansub = true;

                for (var i = 0; i < val + 1; i++) {
                    var item_data = $('.item_data').eq(i),
                        err = item_data.data('missing'),
                        objectName = 'a' + (+i + 1);

                    if (err) {
                        if (this.dataArray[objectName] == '' || this.dataArray[objectName] == undefined) {
                            item_data.next('.error-message').html(err);
                            this.cansub = false;
                        } else {
                            item_data.next('.error-message').empty();
                            ++okNum;
                        }
                    }
                    if (i == 3) {
                        if (this.dataArray[objectName] == '' || this.dataArray[objectName] == undefined) {
                            item_data.next('.error-message').html(err);
                            this.cansub = false;
                        } else if (!/^[1-9]\d*$/.test(this.dataArray[objectName])) {
                            item_data.next('.error-message').html('请输入正确的数值');
                            this.cansub = false;
                        } else {
                            item_data.next('.error-message').empty();
                        }
                    } else if (i == 4) {
                        if (this.dataArray[objectName] == '' || this.dataArray[objectName] == undefined) {
                            ++okNum;
                        } else if (!/^[1-9]\d*$/.test(this.dataArray[objectName])) {
                            item_data.next('.error-message').html('请输入正确的数值');
                            this.cansub = false;
                        } else {
                            item_data.next('.error-message').empty();
                            if (this.dataArray['a6'] != '') {
                                if (this.dataArray['a6'] <= this.dataArray['a5']) {
                                    $('.item_data').eq(5).next('.error-message').html($('.item_data').eq(5).data('wrong'));
                                    this.cansub = false;
                                } else {
                                    $('.item_data').eq(5).next('.error-message').empty();
                                    ++okNum;
                                }
                            }
                        }
                    } else if (i == 5) {
                        if (this.dataArray[objectName] == '' || this.dataArray[objectName] == undefined) {
                            item_data.next('.error-message').html(err);
                            this.cansub = false;
                        } else if (!/^[1-9]\d*$/.test(this.dataArray[objectName])) {
                            item_data.next('.error-message').html('请输入正确的数值');
                            this.cansub = false;
                        } else {
                            item_data.next('.error-message').empty();
                            if (this.dataArray['a5'] != '') {
                                if (this.dataArray['a6'] <= this.dataArray['a5']) {
                                    item_data.next('.error-message').html(item_data.data('wrong'));
                                    this.cansub = false;
                                } else {
                                    item_data.next('.error-message').empty();
                                }
                            }
                        }
                    } else if (i == 7) {
                        if (this.dataArray[objectName] == '' || this.dataArray[objectName] == undefined) {
                            item_data.next('.error-message').html(err);
                            this.cansub = false;
                        } else if (!/^[1-9]\d*$/.test(this.dataArray[objectName]) || this.dataArray[objectName] > 40 * 1e4) {
                            item_data.next('.error-message').html('请输入正确的数值');
                            this.cansub = false;
                        } else {
                            item_data.next('.error-message').empty();
                        }
                    } else if (i == 9) {
                        if (this.dataArray[objectName] == '' || this.dataArray[objectName] == undefined) {
                            item_data.next('.error-message').html(err);
                            this.cansub = false;
                        } else if (!/^[1-9]\d*$/.test(this.dataArray[objectName])) {
                            item_data.next('.error-message').html('请输入正确的数值');
                            this.cansub = false;
                        } else {
                            item_data.next('.error-message').empty();
                        }
                    }
                }

                //console.log(this.cansub);
                //console.log(okNum);
                if (okNum >= 10 && this.cansub) {
                    var _this = this;
                    this.calculate();
                    $('#as_price').html(_this.asPrice);
                    $('#percent').html(_this.rate);

                    $('.Data,.calculator_title').hide();
                    $('.Result').show();
                    $('#calculator').removeClass('Data_layout').addClass('Result_layout');
                    this.partRollNumber[0].push(new this.rollNumber('as_price'));
                    this.partRollNumber[0].push(new this.rollNumber('percent'));
                    this.partNumberRoll(1, 0);
                }
            },

            reCalculate: function () {
                $('#data_form')[0].reset();
                $('.Data,.calculator_title').show();
                $('.Result').hide();
                $('#calculator').removeClass('Result_layout').addClass('Data_layout');

                if (typeof inputStr != 'undefined') inputStr = undefined;
                var _this = this;
                Object.keys(this.dataArray).forEach(function (key) {
                    _this.dataArray[key] = '';
                });
                this.draw().clearResult();
            },
            rollNumber: function (id) {
                var numberEle = $('#' + id);
                var number = new Array;

                var numberText = numberEle.text() + '';

                var padding = numberEle.css('padding').split(' ');
                var paddingTop = padding[0];
                var paddingBottom = padding.length >= 3 ? padding[2] : padding[0];
                numberEle.css({
                    paddingTop: 0,
                    paddingRight: padding.length >= 2 ? padding[1] : padding[0],
                    paddingBottom: 0,
                    paddingLeft: padding.length == 4 ? padding[3] :
                        padding.length >= 2 ? padding[1] : padding[0]
                });

                var html = new Array;
                var numberArray = numberText.split('');
                var delay = 0;
                for (var i = 0; i < numberArray.length; i++) {
                    if (/\d/.test(numberArray[i])) {
                        number.push(+numberArray[i]);
                        html.push('<div style="display:inline-block;position:relative;-webkit-transition:all 0.2s ' + delay + 's;transition:all 0.2s ' + delay + 's;">');
                        for (var j = 0; j < 10; j++)
                            html.push('<div style="position:' + (j == 0 ? 'relative' : 'absolute') + ';top:0;left:0;width:100%;padding:' + paddingTop + ' 0 ' + paddingBottom + ' 0;-webkit-transform:translate(0, ' + (j * 100) + '%);transform:translate(0, ' + (j * 100) + '%);">' + j + '</div>');
                        html.push('</div>');
                        delay = +(delay + (i == 0 ? 0.1 : 0.2)).toFixed(1);
                    } else
                        html.push('<span style="display:inline-block;font-size:1em;padding:' + paddingTop + ' 0 ' + paddingBottom + ' 0;">' + numberArray[i] + '</span>');
                }
                numberEle.html(html.join(''));

                return {
                    costTime: function () {
                        return delay * 1000;
                    },
                    roll: function () {
                        var div = numberEle.find('> div');
                        for (var i = 0; i < number.length; i++) {
                            div.eq(i).css({
                                '-webkit-transform': 'translate(0,-' + (+number[i] * 100) + '%)',
                                'transform': 'translate(0,-' + (+number[i] * 100) + '%)'
                            });
                        }
                    }
                }
            },
            partNumberRoll: function (partnumber, startIndex) {
                var partNumber = this.partRollNumber[partnumber - 1];
                if (partNumber.length > 0) {
                    partNumber[startIndex++].roll();
                    if (startIndex < partNumber.length) {
                        var _this = this;
                        setTimeout(function () {
                            _this.partNumberRoll(partnumber, startIndex);
                        }, partNumber[startIndex - 1].costTime());
                    }
                }
            },
            draw: function () {
                var canvas = document.getElementById('result_graph'),
                    ctx = canvas.getContext('2d');
                var _this = this;

                var obj = {
                    drawResult: function () {
                        ctx.translate(224, 335);
                        var outRadius = 224, innerRadius = 169;

                        //残值区
                        ctx.fillStyle = '#d3000d';
                        ctx.beginPath();
                        ctx.arc(0, 0, outRadius, -45 * Math.PI / 180, (_this.rate / 100 * 360 - 45) * Math.PI / 180, false);
                        ctx.arc(0, 0, innerRadius, (_this.rate / 100 * 360 - 45) * Math.PI / 180, -45 * Math.PI / 180, true);
                        ctx.closePath();
                        ctx.fill();

                        //原价区
                        ctx.fillStyle = '#cbb380';
                        ctx.beginPath();
                        if (_this.rate > 0) {
                            ctx.arc(0, 0, outRadius, (_this.rate / 100 * 360 - 45) * Math.PI / 180, -45 * Math.PI / 180, false);
                            ctx.arc(0, 0, innerRadius, -45 * Math.PI / 180, (_this.rate / 100 * 360 - 45) * Math.PI / 180, true);
                        } else {
                            ctx.arc(0, 0, outRadius, 0, 2 * Math.PI, false);
                            ctx.arc(0, 0, innerRadius, 0, 2 * Math.PI, true);
                        }
                        ctx.closePath();
                        ctx.fill();

                        //延伸线和数值
                        ctx.beginPath();
                        ctx.moveTo(outRadius * Math.cos(-45 * Math.PI / 180), outRadius * Math.sin(-45 * Math.PI / 180));
                        ctx.lineTo(280 * Math.cos(-45 * Math.PI / 180), 280 * Math.sin(-45 * Math.PI / 180));
                        ctx.lineTo(315, 280 * Math.sin(-45 * Math.PI / 180));
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = '#d3000d';
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(325, 280 * Math.sin(-45 * Math.PI / 180), 10, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fillStyle = '#d3000d';
                        ctx.fill();
                        ctx.fillStyle = '#fff';
                        ctx.font = "25px Microsoft YaHei";
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText('残值', (335 - 280 * Math.cos(-45 * Math.PI / 180)) / 2 + 280 * Math.cos(-45 * Math.PI / 180), 280 * Math.sin(-45 * Math.PI / 180) - 52);
                        ctx.font = "40px Arial";
                        ctx.fillText(_this.rate + '%', (335 - 280 * Math.cos(-45 * Math.PI / 180)) / 2 + 280 * Math.cos(-45 * Math.PI / 180), 280 * Math.sin(-45 * Math.PI / 180) - 10);

                        //估价
                        ctx.save();
                        ctx.fillStyle = '#fff';
                        ctx.font = "50px Arial";
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        ctx.fillText('￥' + _this.asPrice, 0, 0);
                        ctx.font = "32px Microsoft YaHei";
                        ctx.textBaseline = 'bottom';
                        ctx.fillText('估价', 0, -10);
                        ctx.restore();
                    },
                    clearResult: function () {
                        ctx.translate(-224, -335);
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                    }
                };

                return obj;
            },
            savePage: function () {
                $('#rsLink').val('正在生成……');
                $('#rsLinkPopup').show();
                this.jsonStr = JSON.stringify(this.dataArray);
                /*var _this = this;
                $.ajax({
                    url: '/minisite/savepage',
                    type: 'POST',
                    data: { dataStr: typeof inputStr == 'undefined' ? _this.jsonStr : inputStr, v: 'original' },
                    async: true,
                    cache: true,
                    dataType: 'json',
                    success: function (json) {
                        if (json.error == '') $('#rsLink').val(json.url);
                        else alert(json.error);
                    }
                });*/
            },
            copyLink: function () {
                var copyBtn = new ClipboardJS('.copyBtn'),
                    copyTipsTimer;
                copyBtn.on('success', function (e) {
                    e.clearSelection();

                    $(e.trigger).find('.tips').text('复制成功').css({opacity: 1});
                    clearTimeout(copyTipsTimer);
                    copyTipsTimer = setTimeout(function () {
                        $(e.trigger).find('.tips').css({opacity: 0});
                    }, 1000);
                });
                copyBtn.on('error', function (e) {
                    $(e.trigger).find('.tips').text('复制失败，请手动复制！').css({opacity: 1});
                    clearTimeout(copyTipsTimer);
                    copyTipsTimer = setTimeout(function () {
                        $(e.trigger).find('.tips').css({opacity: 0});
                    }, 1000);
                });
            },
            closeRsLinkPopup: function () {
                $('#rsLinkPopup').hide();
                $('#rsLink').val('');
            }
        },
        watch: {
            'dataArray.a1': {
                handler() {
                    if (typeof inputStr == 'undefined') {
                        this.dataArray.a2 = '';
                        this.dataArray.a3 = '';
                    }
                    this.disableEmission = true;
                    this.disableSpecification = true;
                    this.emissionList = [];
                    this.SpecificList = [];
                    for (var i in this.tag) {
                        if (this.tag[i].model == this.dataArray.a1) {
                            for (var n in this.tag[i].emission) {
                                //console.log(this.tag[i].emission[n].e);
                                this.disableEmission = false;
                                this.emissionList.push(this.tag[i].emission[n].e);
                            }
                        }
                    }
                },
                deep: true,
                immediate: true
            },
            'dataArray.a2': {
                handler() {
                    if (typeof inputStr == 'undefined') {
                        this.dataArray.a3 = '';
                    }
                    this.disableSpecification = true;
                    this.SpecificList = [];
                    for (var i in this.tag) {
                        if (this.tag[i].model == this.dataArray.a1) {
                            for (var n in this.tag[i].emission) {
                                //console.log(this.tag[i].emission[n].e);
                                if (this.tag[i].emission[n].e == this.dataArray.a2) {
                                    for (var m in this.tag[i].emission[n].SpecificationList) {
                                        //console.log(this.tag[i].emission[n].SpecificationList[m].info);
                                        this.disableSpecification = false;
                                        this.SpecificList.push({
                                            txt: this.tag[i].emission[n].SpecificationList[m].info
                                        });
                                    }
                                }
                            }
                        }
                    }
                },
                deep: true,
                immediate: true
            },
            'dataArray.a3': {
                handler() {
                    for (var i in this.tag) {
                        if (this.tag[i].model == this.dataArray.a1) {
                            for (var n in this.tag[i].emission) {
                                //console.log(this.tag[i].emission[n].e);
                                if (this.tag[i].emission[n].e == this.dataArray.a2) {
                                    for (var m in this.tag[i].emission[n].SpecificationList) {
                                        if (this.tag[i].emission[n].SpecificationList[m].info == this.dataArray.a3) {
                                            this.spe = this.tag[i].emission[n].SpecificationList[m].value;
                                            this.priceTag = this.tag[i].emission[n].SpecificationList[m].price;
                                            if (typeof inputStr != 'undefined') {
                                                this.calculate();
                                                $('#as_price').html(this.asPrice);
                                                $('#percent').html(this.rate);

                                                $('.Data,.calculator_title').hide();
                                                $('.Result').show();
                                                $('#calculator').removeClass('Data_layout').addClass('Result_layout');
                                                this.partRollNumber[0].push(new this.rollNumber('as_price'));
                                                this.partRollNumber[0].push(new this.rollNumber('percent'));
                                                this.partNumberRoll(1, 0);
                                            }
                                            //console.log(this.priceTag);
                                            //console.log(this.spe);
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                deep: true,
                immediate: true
            }
        }
    });
}());