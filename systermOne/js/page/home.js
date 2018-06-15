





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
    })
}
$(function(){
    keywordSearch();                                   //关键字搜索
});
