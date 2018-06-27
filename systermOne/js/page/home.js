// var width = (document.body.clientWidth)*(98/100)*(40/100)+'px';
var width = 360+ 'px';
var height = 196+'px';
var resizeCss = function() {
    $("#circleOne").css("width", width).css("height", height);
    $("#circleTwo").css("width", width).css("height", height);
    $("#circleThree").css("width", width).css("height", height);
};
resizeCss();
var circleOne = echarts.init(document.getElementById('circleOne'));
var circleTwo = echarts.init(document.getElementById('circleTwo'));
var circleThree = echarts.init(document.getElementById('circleThree'));
var option  = option1 = option2  =   null;
option = option1 = option2  = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:['#5ec3ea','#7962ed','#5ae5da','#ed80ce'],
    legend: {
        orient: 'vertical',
        x: 'right',
        y: 'center',
        icon:'circle',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            center:['30%','50%'],
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};
circleOne.clear();
circleOne.setOption(option,true);
circleTwo.clear();
circleTwo.setOption(option1,true);
circleThree.clear();
circleThree.setOption(option2,true);
//Echars自适应浏览器大小
window.onresize = function() {
    resizeCss();
    circleOne.resize();
    circleTwo.resize();
    circleThree.resize();
};



















function loadDetail(){
    $("#lookDetail").click(function(){
        console.log("ok");
        $(".homeBox").load("detail.html");
    })
}
$(function(){
    loadDetail();                                                     //

});
