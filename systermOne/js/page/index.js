















function loadBox(){
    $("#loadBox").load("home.html");
}
function keywordSearch(){
    $("#searchKey").keyup(function(){
        var searchKey = $(this).val();
        var reg = new RegExp(searchKey, "i"); //忽略大小写匹配搜索框中输入的内容
        $.ajax({
            type: "get",
            url: "js/project.json",
            dataType: "json",
            success: function (data) {
                ProjectListA = new ProjectList(data);
                var arr = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    if (searchKey != "" && (data[i].initial.search(reg) != -1 || data[i].keyword.search(reg) != -1)) {
                        arr.push("<li class='keyList' id='keyList'>" + data[i].keyword + "</li><span style='display: none;'>"+data[i].geo+"</span><img class='peizhi' data-toggle='modal' data-target='#configModal' src='../../../../testOne/systermOne/img/peizhi.png' alt='配置'>");
                    }
                }
                $(".keywords_list").html(arr).show();
                $("#testList").setItemHeight();                        //地图上高亮显示
                $(".keyList").click(function(){
                    var geo = $(this).next("span").text();
                    var arr = geo.split(",");
                    for(var i=0;i<arr.length;i++){
                        var marker = new BMap.Marker(new BMap.Point(arr[0],arr[1]));
                        map.addOverlay(marker);
                        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    }
                    //创建信息窗口
                    var title = $(this).text();
                    var sContent ="";
                    sContent +=    "<div class='infoBox'><h4 class='infoTitle'>"+ title +"</h4>" +
                        "<p class='process'>工程进度:</p>" +"<p class='mointor'>监测状态:</p>"+
                        "</div>";
                    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                    marker.addEventListener("click", function(){
                        this.openInfoWindow(infoWindow);
                        //图片加载完毕重绘infowindow
                    });
                    //右键菜单事件
                    var markerMenu=new BMap.ContextMenu();
                    marker.addEventListener("rightclick",function(){
                        this.addContextMenu(markerMenu);//给标记添加右键菜单
                    });
                    markerMenu.addItem(new BMap.MenuItem('进入项目',EventMarker.bind(map)));
                    marker.addContextMenu(markerMenu);
                    function EventMarker(map){
                        console.log(map);
                        $("#loadBox").load("test.html");
                    }
                })
            }
        });
        $(".keywords_list").css("display","block");

    })
}
function outClick(){
    $("#out").click(function(){
        window.location.href="login.html";
        $("#userName").html("");
    })
}
function userName(){
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    var userName = $.getUrlParam('userName');
    $("#userName").html(userName);
}
function nowData(){
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";

    if(hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    // console.log(clock);
    $(".nowDay").html(clock);
    // $(".nowTime").html(times);
}
$(function(){
    nowData();                                         //当前日期
    userName();                                        //保存用户名
    outClick();                                         //退出
    keywordSearch();                                   //关键字搜索
    loadBox();
});
