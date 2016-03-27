/****************************************************************
 *	指令形式
 * 	{
 * 		id: 0,(飞船号，在哪个轨道创建 可选 0-3)
 * 		command: 'create',(指令 可选 create, flight, stop, boom)
 * 		dynamical: 1 (速率 可选 1, 2, 3)
 * 		energy: 2 (动力恢复 2, 3, 4)
 * 		useEnergy: 5 (能耗 5，7， 9 与上面速率一一对应)
 *   }
 ****************************************************************/



//获取各种功能button
var orbitArr = [$('.orbit0 input'), $('.orbit1 input'), $('.orbit2 input'), $('.orbit3 input')];
//存放动力系统的值
var powerArr = [[1, 5], [2, 7], [3, 9]];
//存放能源系统的值
var energyArr = [2, 3, 4];

//遍历监听事件
for (var i = 0, olen = orbitArr.length; i < olen; i ++) {
    (function () {
        var t = i;
        for (var j = 0, len = orbitArr[t].size(); j < len; j ++) {
            (function () {
                var temp = j;
                orbitArr[t].eq(temp).on('click', function () {
                    sendFn(t, temp);
                });
            })();
        }
    })();
}
//暂存指令
var cmdAirshipArr = [{}, {}, {}, {}];

//发送信息
function sendFn(orbit, command) {
    cmdAirshipArr[orbit].id = orbit;

    if (command == 0) {
        cmdAirshipArr[orbit].command = 'create';
        $('.create-wrap').show();


        /**
         * 解决第几次点击就会执行多少次的问题
         * 问题原因：jQuery的事件绑定机制里用数组来保存事件，如果对同一元素进行重复绑定，不会覆盖之前已经绑定的事件，只是把新的绑定事件再push到保存事件的数组中，当事件触发时就会循环执行数组中的事件。
         * 解决方案1：绑定前使用off()方法一次性解除所有的绑定 见2_26源码
         * 解决方案2：使用one()绑定
         */
        $('input[name=create-airship]').one('click', function () {

            var powers = $('.power input');
            var energys = $('.energy input');
            //默认配置
            //3.27更新 一个小小的逻辑问题 导致第二个动力和能源系统无法正常选择
            cmdAirshipArr[orbit].dynamical = powerArr[0][0];
            cmdAirshipArr[orbit].useEnergy = powerArr[0][1];
            cmdAirshipArr[orbit].energy = energyArr[0];
            for (var i = 0; i < 3; i ++) {
                if (powers.eq(i)[0].checked) {
                    //设置为选中的动力配置
                    cmdAirshipArr[orbit].dynamical = powerArr[i][0];
                    cmdAirshipArr[orbit].useEnergy = powerArr[i][1];
                }
                if (energys.eq(i)[0].checked) {
                    //设置为选中的能源配置
                    cmdAirshipArr[orbit].energy = energyArr[i];
                }
            }
            commander.send(cmdAirshipArr[orbit]);
            updateCmdWrap();
            $('.create-wrap').hide();
        });
    } else {
        if (command == 1) {
            cmdAirshipArr[orbit].command = 'flight';
        } else if (command == 2) {
            cmdAirshipArr[orbit].command = 'stop';
        } else if (command == 3) {
            cmdAirshipArr[orbit].command = 'boom';
        }
        commander.send(cmdAirshipArr[orbit]);
        updateCmdWrap();
    }


}
//更新指挥官视图
function updateCmdWrap() {
    var msgArr = commander.message;
    var flyArr = commander.isFlightArr;


    for (i = 0; i < 4; i ++) {
        $('.command-message div').eq(i).find('span').eq(1).html('未创建');
        $('.command-message div').eq(i).find('span').eq(2).html('未飞行');
        if (msgArr[i]) {
            $('.command-message div').eq(i).find('span').eq(1).html('已创建');
        }
        if (flyArr[i]) {
            $('.command-message div').eq(i).find('span').eq(2).html('飞行中');
        }
    }
}

$('input[name=cancel]').on('click', function () {
    $('.create-wrap').hide();
});
