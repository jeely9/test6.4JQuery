





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
                        arr.push("<li class='keyList' id='keyList'>" + data[i].keyword + "</li><span style='display: none;'>"+data[i].geo+"</span>");
                    }
                }
                $(".keywords_list").html(arr).show();
                $("body").setItemHeight();                        //地图上高亮显示
            }
        });
        $(".keywords_list").css("display","block");
    })
}
function nowData(){
    var myDate = new Date();
    var nowDay = myDate.toLocaleDateString();                         //获取当前日期
    var hours = myDate.getHours();                                    //获取当前小时数(0-23)
    var minutes = myDate.getMinutes();                                //获取当前分钟数(0-59)
    var times = hours+":"+minutes;
    $(".nowDay").html(nowDay);
    $(".nowTime").html(times);
}
function programList(){
    $("#programClose").click(function(){
        $(".tabList").css("display","none");
    });

}
$(function(){
    nowData();                                         //当前日期
    keywordSearch();                                   //关键字搜索
    programList();
});
