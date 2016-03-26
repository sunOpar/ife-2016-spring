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

    sendAdapter: function(uCommand){
        /***********************************************
         *     编译表                                *
         *     二进制      0001    0010    0100    1000 *
         *     id         0       1       2       3    *
         *     command    create  flight  stop    boom *
         *     dynamical  1       2       3            *
         *     energy     2       3       4            *
         *     useEnergy  5       7       9            *
         ***********************************************/

         if (uCommand.command == 'create') {
             this.createAitship(uCommand);
             return;
         }

         var result = compile(uCommand);
         bus(result);
    },

    createAitship: function (uCommand) {
        airshipArr[uCommand.id] = new Airship(uCommand);
        $('<p>' + uCommand.id + '号飞船创建成功</p>').prependTo($('.god-message'));
    }
}

var compileArr = ['0001', '0010', '0100', '1000'];

function compile(obj) {
    var resulrArr = new Array(5);

    resulrArr[0] = compileArr[obj.id];

    if (obj.command == 'create') {
        resulrArr[1] = compileArr[0];
    } else if (obj.command == 'flight') {
        resulrArr[1] = compileArr[1];
    } else if (obj.command == 'stop') {
        resulrArr[1] = compileArr[2];
    } else if (obj.command == 'boom') {
        resulrArr[1] = compileArr[3];
    }


    return resulrArr.join('');

}


//指挥官对象
var commander = {

    //指挥官记录的飞船信息（由于存在丢包概率，指挥官记录的情况可能与真实情况不符，请不要责备无辜的指挥官:)）
    message: [false, false, false, false],

    isFlightArr: [false, false, false, false],

    //方法；发送信息(参数：发送的指令)
    send: function(uCommand) {

        if (uCommand.command === 'create') {
            this.message[uCommand.id] = true;
            this.isFlightArr[uCommand.id] = false;
        }

        if (uCommand.command === 'boom') {
            this.message[uCommand.id] = false;
            this.isFlightArr[uCommand.id] = false;
        }

        if (uCommand.command === 'flight' && this.message[uCommand.id]) {
            this.isFlightArr[uCommand.id] = true;
        }

        if (uCommand.command === 'stop') {
            this.isFlightArr[uCommand.id] = false;
        }

        //在2_26中 我们通过mediator介质传播指挥官的指令，现在需要通过行星的编译系统
        // mediator(uCommand);

        planet.sendAdapter(uCommand);
    }
}

//BUS
function bus(str) {
    setTimeout(function () {
        if (Math.random() > 0.1) {
            //传播成功
            $('<p>传播成功,指令: '
                + str.slice(0, 8) +
            '</p>').prependTo($('.god-message'));

            for (var i = 0, len = airshipArr.length; i < len; i ++) {
                if (typeof airshipArr[i] == 'object') {
                    airshipArr[i].receive(str);
                }
            }

        } else {
            //传播失败，再次传播中...
            bus(str);
            $('<p class="warning">传播失败,再次传播中,指令: '
                + str.slice(0, 8) +
            '</p>').prependTo($('.god-message'));
        }
    }, 300);
}


function change(arr) {
    var obj = {};
    var commandStrArr = ['create', 'flight', 'stop', 'boom'];
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
    this.receive = function (str) {
        var tempArr = [];
        var temp = 0;
        for (var i = 0, len = str.length; i < len; i += 4) {
            tempArr[temp ++] = str.slice(i, i + 4);
        }
        this.dispose(change(tempArr));
    }

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
                this.boom();
            }

        }

    }

    //绘制
    this.draw = function() {
        this.frameNum ++;
        context.fillStyle = greenColor;
        context.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

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
            airshipArr.splice(this.orbit, 1);
        },

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
        },

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
        }
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

            if (airshipArr[i].isFlight) {
                airshipArr[i].flight();
            }
        }
    }

    window.requestAnimationFrame(animate);

}
