//储存全局变量
var glb = {};

(function () {
    var block = document.querySelector('#block');
    var inputs = document.querySelectorAll('#inputs input');
    var btns = document.querySelectorAll('#btns button');
    glb.block = block;
    glb.inputs = inputs;
    glb.btns = btns;
    //获取坐标与选转角度
    glb.getAttr = function () {
        var arr = glb.block.style.transform.match(/-?\d+/g);
        //转为整形
        for (var i = 0, len = arr.length; i < len; i ++) {
            arr[i] = parseInt(arr[i]);
        }
        return arr;
    }
    //判断方向
    glb.direction = function () {
        var deg = glb.getAttr()[2];
        while (deg > 360) {
            deg -= 360;
        }
        while (deg < -360) {
            deg += 360;
        }
        var dir = deg / 90;
        if (dir === 1 || dir === -3) {
            return 'right';
        } else if (dir === 2 || dir === -2) {
            return 'down';
        } else if (dir === 3 || dir === -1) {
            return 'left';
        } else {
            return 'top';
        }
    }
})();

//小方块随机位置
(function () {
    //随机函数，用于产生小方块初始的left与top值
    function random() {
        return Math.floor(Math.random() * 10 + 1) * 50 ;
    }

    glb.block.style.transform = "translate(" + random() + "px, " + random() + "px) rotate(0deg)";
})();

//go
(function () {
    glb.go = function () {
        var direction = glb.direction();
        var tempArr = glb.getAttr();
        var x = tempArr[0];
        var y = tempArr[1];
        var deg = tempArr[2];

        if (direction === 'top') {
            y -= y - 50 > 0 ? 50 : 0;
        } else if (direction === 'left') {
            x -= x - 50 <= 0 ? 0 : 50;
        } else if (direction === 'down') {
            y += y + 50 < 550 ? 50 : 0;
        } else {
            x += x + 50 >= 550 ? 0 : 50;
        }

        glb.block.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + deg + "deg)";
    }

    glb.btns[0].addEventListener('click', glb.go, false);
})();

//turn left
(function () {
    glb.lef = function () {
        var tempArr = glb.getAttr();
        var x = tempArr[0];
        var y = tempArr[1];
        var deg = tempArr[2];

        deg -= 90;
        glb.block.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + deg + "deg)";
    }

    glb.btns[1].addEventListener('click', glb.lef, false);
})();

//turn right
(function () {
    glb.rig = function () {
        var tempArr = glb.getAttr();
        var x = tempArr[0];
        var y = tempArr[1];
        var deg = tempArr[2];

        deg += 90;
        glb.block.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + deg + "deg)";
    }

    glb.btns[2].addEventListener('click', glb.rig, false);
})();

//turn bac
(function () {
    glb.bac = function () {
        var tempArr = glb.getAttr();
        var x = tempArr[0];
        var y = tempArr[1];
        var deg = tempArr[2];

        deg += 180;
        glb.block.style.transform = "translate(" + x + "px, " + y + "px) rotate(" + deg + "deg)";
    }

    glb.btns[3].addEventListener('click', glb.bac, false);
})();

//input btn
(function () {
    glb.inputs[1].addEventListener('click', function () {
        var value = glb.inputs[0].value;
        glb.inputs[0].value = '';
        if (value === 'TUN BAC' || value === 'tun bac') {
            glb.bac();
        } else if (value === 'TUN RIG' || value === 'tun rig' || value === 'turn right') {
            glb.rig();
        } else if (value === 'TUN LEF' || value === 'tun lef' || value === 'turn left') {
            glb.lef();
        } else if (value === 'GO' || value === 'go') {
            glb.go();
        }
    }, false);
})();
