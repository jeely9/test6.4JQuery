(function(window,document){
    function Bclass(){
        return this.init(arguments);
    }
    Bclass.addObjectMethod =  function(setItemHeight){
        if (!Clazz.fn[nmSpace]){Clazz.fn[nmSpace] = {}}
        for (var i in obj){
            Clazz.fn[nmSpace][i] = obj[i];
        }
        if (ftn) {ftn()}
    };

    $.fn.setItemHeight = function(options){
        var defaults = {
            heightClass:"keyList",
        };
        var options = $.extend(defaults, options);
        this.each(function(){
            var thisItem=$(this);
            map.clearOverlays();
            $(thisItem).find("li").bind("click", function () {
                var value=$(this).text();
                $("#searchKey").val(value);
                $('.keywords_list').hide();
                var geo = $(this).next("span").text();
                var arr = geo.split(",");
                for(var i=0;i<arr.length;i++){
                    var marker = new BMap.Marker(new BMap.Point(arr[0],arr[1]));
                    map.addOverlay(marker);
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                }
            });
        });
    };






























    window.Bclass = Bclass;
})(window,document,undefined);
