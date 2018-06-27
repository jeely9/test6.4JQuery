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
option = {
    title: {
        text: '堆叠区域图',
        left: 'center'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
        show:false
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
option1 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
    }]
};
option2 = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
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




























function tableContent(list){
    $("#content").html("");
    var tableContent = '';
    tableContent += '<tr>';
    for (var m=0;m<list.length;m++){
        tableContent += '<td>'+list[m].Base+'</td>';
        tableContent += '<td>'+list[m].StratumID+'</td>';
        tableContent += '<td>'+list[m].Top+'</td>';
        tableContent += '</tr>';
    }
    $("#content").html(tableContent);
    // $(".table").setTableClickBg();
    $("#test tbody tr").click(function(){
        $(this).addClass('selected').siblings().removeClass('selected').end();
    })
}

function tableData(){
    $.ajax({
        type: "get",
        url: "http://"+host+"/api/geology/borehole?project=iS3Demo&id=1",
        async: true,
        dataType: 'json',
        success: function (data) {
            var datas = data.data;
            projectA = new Borehole(datas);
            projectA.geo();
            // console.log(projectA);
            var list = datas.geologies;
            chirdren = new BoreholeGeo(list);
            tableContent(list);
        },
        error: function (e) {
            console.log(e);
        }
    })
}




















$(function () {
    tableData();                              //表格数据
});
