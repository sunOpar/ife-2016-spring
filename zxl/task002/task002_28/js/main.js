var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var greenColor = 'rgb(139, 195, 74)';
//存放实例化的飞船对象
var airshipArr = [0, 0, 0, 0];

//行星对象
var planet = {
    x: 400,
    y: 400,
    r: 100,
    //方法：绘制行星（自己）
    drawSelf: function() {
        context.beginPath();
        context.fillStyle = greenColor;
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    },
    //方法：绘制轨道
    drawOrbit: function() {
        for (var i = 0; i < 4; i++) {
            context.beginPath();
            context.strokeStyle = greenColor;
            context.arc(this.x, this.y, this.r + (i + 1) * 50, 0, Math.PI * 2, false);
            context.closePath();
            context.stroke();
        }
    },
    //行星Adapter模块
    adapter: {
        send: function(uCommand){

             if (uCommand.command == 'create') {
                 planet.createAitship(uCommand);
                 return;
             }

             var result = compile(uCommand);
             bus(result);
        },

        receive: function (str) {
            var arr = [];
            //判断指令是否由飞船发出
            for (var i = 0; i < 4; i ++) {
                if (str.slice(0, 4) == airshipCompileArr[i]) {
                    arr.push(i);
                }
            }
            if (arr.length != 1) {
                return;
            }

            for (var i = 0; i < 4; i ++) {
                if (str.slice(4, 8) == airshipCompileArr[i]) {
                    arr.push(stateArr[i]);
                }
            }
            arr.push(two2ten(str.slice(8, 16)));

            $('.command-message tr').eq(arr[0] + 1).find('td').eq(2).html(arr[1]);
            if (arr[1] == stateArr[3]) {
                $('.command-message tr').eq(arr[0] + 1).find('td').eq(2).css('color', 'red');
            }
            $('.command-message tr').eq(arr[0] + 1).find('td').eq(3).html(arr[2]);

        }
    },

    createAitship: function (uCommand) {
        airshipArr[uCommand.id] = new Airship(uCommand);
        $('<p>' + uCommand.id + '号飞船创建成功</p>').prependTo($('.god-message'));
        $('.command-message tr').eq(uCommand.id + 1).find('td').eq(1).html(stateArr[0]);
        $('.command-message tr').eq(uCommand.id + 1).find('td').eq(2).html(stateArr[2]);
        $('.command-message tr').eq(uCommand.id + 1).find('td').eq(2).css('color', 'rgb(139, 195, 74)');
        $('.command-message tr').eq(uCommand.id + 1).find('td').eq(3).html(100);
        $('.command-message tr').eq(uCommand.id + 1).find('td').eq(4).html(powerStrArr[uCommand.dynamical - 1]);
        $('.command-message tr').eq(uCommand.id + 1).find('td').eq(5).html(energyStrArr[uCommand.energy - 2]);
    }
}

//2进制转10进制
function two2ten(str) {
    var arr = str.split('');
    var num = 0;
    //按权求和
    for (var i = 0; i < 8; i ++) {
        arr[7 - i] = parseInt(arr[7 - i]) * Math.pow(2, i);
        num += arr[7-i];
    }
    return num;
}


/***********************************************
 *     行星编译表                                *
 *     二进制      0001    0010    0100    1000 *
 *     id         0       1       2       3    *
 *     command    create  flight  stop    boom *
 ***********************************************/

//行星发送飞船指令 8位 id+command 参照上表
//飞船发送行星16位

/***********************************************
 *     飞船编译表                                *
 *     二进制      1110    1101    1011    0111 *
 *     id         0       1       2       3    *
 *     command    create  flight  stop    boom *
 ***********************************************/

//编译与转译使用
var compileArr = ['0001', '0010', '0100', '1000'];
var commandStrArr = ['create', 'flight', 'stop', 'boom'];
var stateArr = ['已创建', '飞行中', '未飞行', '已自爆'];
var airshipCompileArr = ['1110', '1101', '1011', '0111'];
var powerStrArr = ['奇点', '碎星', '闪烁'];
var energyStrArr = ['古筝', '营地', '水滴'];

function compile(obj) {
    var resulrArr = new Array();

    resulrArr.push(compileArr[obj.id]);

    if (obj.command == 'create') {
        resulrArr.push(compileArr[0]);
    } else if (obj.command == 'flight') {
        resulrArr.push(compileArr[1]);
    } else if (obj.command == 'stop') {
        resulrArr.push(compileArr[2]);
    } else if (obj.command == 'boom') {
        resulrArr.push(compileArr[3]);
    }

    return resulrArr.join('');

}

function aCompile(obj) {
    var resulrArr = new Array();
    resulrArr.push(airshipCompileArr[obj.aId]);

    if (obj.state == 1) {
        resulrArr.push(airshipCompileArr[1]);
    } else if (obj.state == 2) {
        resulrArr.push(airshipCompileArr[2]);
    } else {
        resulrArr.push(airshipCompileArr[3]);
    }

    resulrArr.push(ten2two(obj.hp));

    return resulrArr.join('');
}

function ten2two(num) {
    var tempArr = [0, 0, 0, 0, 0, 0, 0, 0];
    var temp = 7;
    while (num > 0) {
        tempArr[temp --] = num % 2;
        num = Math.floor(num / 2);
    }
    return tempArr.join('');
}




//指挥官对象
var commander = {
    //加入了飞船监控系统后，指挥官再也不用小本本啦
    //方法；发送信息(参数：发送的指令)
    send: function(uCommand) {
        //在2_26中 我们通过mediator介质传播指挥官的指令，现在需要通过行星的编译系统
        // mediator(uCommand);

        planet.adapter.send(uCommand);
    }
}

//BUS
function bus(str) {
    setTimeout(function () {
        if (Math.random() > 0.1) {
            //传播成功
            $('<p>传播成功,指令: '
                + str +
            '</p>').prependTo($('.god-message'));

            for (var i = 0, len = airshipArr.length; i < len; i ++) {
                if (typeof airshipArr[i] == 'object') {
                    airshipArr[i].adapter.receive(str);
                }
            }

            planet.adapter.receive(str);

        } else {
            //传播失败，再次传播中...
            bus(str);
            $('<p class="warning">传播失败,再次传播中,指令: '
                + str +
            '</p>').prependTo($('.god-message'));
        }
    }, 300);
}

//飞船 二进制转为可读数据
function change(arr) {
    var obj = {};
    for (var i = 0; i < 4; i ++) {
        if (arr[0] == compileArr[i]) {
            obj.id = i;
        }
        if (arr[1] == compileArr[i]) {
            obj.command = commandStrArr[i];
        }
    }
    return obj;
}


//飞船类
function Airship(createCommand) {

    // 轨道 速度 能源回复 能耗
    this.orbit = createCommand.id;
    this.dynamical = createCommand.dynamical;
    this.energy = createCommand.energy;
    this.useEnergy = createCommand.useEnergy;

    //总能源
    this.hp = 100;
    this.w = 60;
    this.h = 20;
    //矩形中心点 坐标向左向上移动自身宽高的一半
    this.x = 550 + this.orbit * 50;
    this.r;
    this.deg = 0;
    this.y = 400;

    this.isFlight = false;
    this.isBoom = false;
    this.frameNum = 0;

    //接受信息 并转为可处理信息
    var _this = this;
    //飞船Adapter模块
    this.adapter = {
        sendTime: 0,
        //接收数据模块
        receive: function (str) {
            var tempArr = [];
            var temp = 0;
            for (var i = 0, len = str.length; i < len; i += 4) {
                tempArr[temp ++] = str.slice(i, i + 4);
            }
            _this.dispose(change(tempArr));
        },
        //发送数据模块
        send: function () {
            if(_this.isBoom) {
                bus(aCompile({
                    aId: _this.orbit,
                    state: 3,
                    hp: _this.hp
                }));
            }
            this.sendTime ++;
            if(this.sendTime % 500 == 0) {
                bus(aCompile({
                    aId: _this.orbit,
                    state: _this.isFlight ? 1 : 2,
                    hp: _this.hp
                }));
                this.sendTime = 0;
            }
        }
    };

    // this.receive = function (str) {
    //     var tempArr = [];
    //     var temp = 0;
    //     for (var i = 0, len = str.length; i < len; i += 4) {
    //         tempArr[temp ++] = str.slice(i, i + 4);
    //     }
    //     this.dispose(change(tempArr));
    // }

    //处理信息
    this.dispose = function(uCommand) {
        var isMe = false;
        for (var i = 0, len = airshipArr.length; i < len; i++) {
            //遍历判断自己是不是接受者
            if (this == airshipArr[uCommand.id]) {
                isMe = true;
            }
            break;
        }

        if (isMe) {

            if (uCommand.command === 'flight') {
                this.flight();
            } else if (uCommand.command === 'stop') {
                this.stop();
            } else if (uCommand.command === 'boom') {
                this.isBoom = true;
            }

        }

    };

    //绘制
    this.draw = function() {
        this.frameNum ++;
        context.fillStyle = greenColor;
        context.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    };

    //飞行
    this.flight = function() {
            this.isFlight = true;
            this.r = 150 + this.orbit * 50;
            this.deg += this.dynamical;
            if (this.deg > 360) {
                this.deg = 0;
            }
            this.x = 400 + this.r * Math.cos(Math.PI / 180 * this.deg);
            this.y = 400 + this.r * Math.sin(Math.PI / 180 * this.deg);
        },
        //停止飞行
        this.stop = function() {
            this.isFlight = false;
        },
        //自爆
        this.boom = function() {
            airshipArr.splice(this.orbit, 1, 0);
        },

        //能量回复
        this.restore = function() {
            if (this.isFlight) {
                return;
            }
            if (this.frameNum % 50 == 0) {
                this.hp += this.energy;
                this.hp = this.hp > 100 ? 100 : this.hp;
            }
            context.font = "15px Microsoft YaHei";
            context.fillStyle = '#fff';
            context.fillText(this.hp + '%', this.x - 15, this.y + 5);
        };

        //消耗能量
        this.consume = function() {
            if (!this.isFlight) {
                return;
            }
            if (this.frameNum % 50 == 0) {
                this.hp -= this.useEnergy;
                this.hp = this.hp < 0 ? 0 : this.hp;
            }
            context.font = "15px Microsoft YaHei";
            context.fillStyle = '#fff';
            context.fillText(this.hp + '%', this.x - 15, this.y + 5);

            if (this.hp == 0) {
                this.isFlight = false;
                $('<p class="warning">' + this.orbit + '号飞船能量耗尽,停止飞行 </p>').prependTo($('.god-message'));
            }
        };
}




animate();



function animate() {


    context.clearRect(0, 0, canvas.width, canvas.height)

    planet.drawSelf();
    planet.drawOrbit();

    for (var i = 0; i < airshipArr.length; i++) {
        if (airshipArr[i] instanceof Object) {
            airshipArr[i].draw();

            airshipArr[i].restore();
            airshipArr[i].consume();
            airshipArr[i].adapter.send();

            if (airshipArr[i].isBoom) {
                airshipArr[i].boom();
            }

            if (airshipArr[i].isFlight) {
                airshipArr[i].flight();
            }
        }
    }

    window.requestAnimationFrame(animate);

}
