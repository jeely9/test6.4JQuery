;(function($, window, document,undefined) {
    //点击某工程该工程位置高亮
    $.fn.setItemHeight = function(options){
        var defaults = {
            heightClass:"keyList",
        };
        var options = $.extend(defaults, options);
        this.each(function(){
            var thisItem=$(this);
            map.clearOverlays();
            $(thisItem).find("li").bind("click", function () {
                clickEvent();
                $(".tabList").css("display","block");
            });
        });
    };
    $.fn.setTable = function(options){
        var defaults = {
            clickClass:"evenRow",
        };
        var options = $.extend(defaults, options);
        this.each(function(){
            var thisMenu=$(this);
            $(thisMenu).find("li").bind("click", function () {
                $("table").show();
            });
        });
    };
    $.fn.setTableClickBg = function(options) {
        var defaults = {
            background: 'yellow'
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            var thisTable = $(this);
            $(thisTable).find("tr").bind("click", function () {
                console.log($(this));
                $(this).addClass(options.selected);
                // $("tbody tr").addClass('selected')               //为选中项添加高亮
                //     .siblings().removeClass('selected')     //去除其他项的高亮形式
                //     .end();
            });
        });
        return this
    }
    function clickEvent(){
        var value=$(this).text();
        $("#searchKey").val(value);
        $("#programName").html(value);
        $('.keywords_list').hide();
        var geo = $(this).next("span").text();
        var arr = geo.split(",");
        for(var i=0;i<arr.length;i++){
            var marker = new BMap.Marker(new BMap.Point(arr[0],arr[1]));
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }
    }
})(jQuery, window, document);


