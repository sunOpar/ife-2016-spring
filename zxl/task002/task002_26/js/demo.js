var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var greenColor = 'rgb(139, 195, 74)';
var airshipArr = [];

function createRound(x, y, r) {
    context.beginPath();
    context.fillStyle = greenColor;
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}


//行星
function Planet(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    //画行星
    this.drawPlanet = function () {
        context.beginPath();
        context.fillStyle = greenColor;
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }
    //画轨道
    this.drawOrbit = function () {
        for (var i = 0; i < 4; i ++) {
            context.beginPath();
            context.strokeStyle = greenColor;
            context.arc(this.x, this.y, this.r + (i + 1) * 50, 0, Math.PI * 2, false);
            context.closePath();
            context.stroke();
        }
    };

}

var planet = new Planet(400, 400, 100);

planet.drawPlanet();
planet.drawOrbit();


//指挥官
function Commander() {



    //创建飞船
    this.createAirship = function (arr) {
        //调用Airship方法
        var newAirship = new Airship(arr[1], arr[2], 60, 20, arr[2] - 400);
        newAirship.drawAirship();
        airshipArr.push(newAirship);
        console.log(airshipArr[arr[0]]);
        airshipMoveAnimate(airshipArr[arr[0]]);
    }
}


var OrbitXYArr = [[0, 400, 550], [1, 400, 600]];

var master = new Commander();
master.createAirship(OrbitXYArr[0]);

master.createAirship(OrbitXYArr[1]);




function Airship(x, y, w, h, r) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    // this.speed = s;
    this.animateID;
    this.deg = 1;
    //energy属性 储存剩余能源 每个新飞船能源为100
    // this.energy ＝ 100;

    this.drawAirship = function () {
        context.fillStyle = greenColor;
        this.centerX = 400 + this.x - this.w / 2;
        this.centerY = 400 +　this.y - this.h / 2;
        context.fillRect(this.centerX, this.centerY, this.w, this.h);
    };

    this.move = function () {
        this.deg ++;
        if (this.deg > 360) {
            this.deg = 0;
        }
        this.x = this.r * Math.cos(Math.PI / 180 * this.deg);
        this.y = this.r * Math.sin(Math.PI / 180 * this.deg);
    }
}


function airshipMoveAnimate(obj) {
    obj.timer = setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        planet.drawPlanet();
        planet.drawOrbit();
        obj.move();

        obj.drawAirship();
    }, 30);


}
