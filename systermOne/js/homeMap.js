var map = new BMap.Map("homeMap");                               // 创建Map实例
map.centerAndZoom("上海",15);
map.enableScrollWheelZoom(true);                                //开启鼠标滚轮缩放




function infoWindow(map){
    var data_info = [
        [121.477594, 31.239078,"地址：人民广场"],
        [121.466095, 31.233644,"地址：南京西路"],
        [121.465305, 31.246673,"地址：汉中路"],
        [121.508855, 31.243586,"地址：陆家嘴"]
    ];
    var opts = {
        width : 250,     // 信息窗口宽度
        height: 80,     // 信息窗口高度
        title : "信息窗口" , // 信息窗口标题
        enableMessage:true//设置允许信息窗发送短息
    };
    for(var i=0;i<data_info.length;i++){
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
        var content = data_info[i][2];
        map.addOverlay(marker);               // 将标注添加到地图中
        addClickHandler(content,marker);
    }
    function addClickHandler(content,marker){
        marker.addEventListener("click",function(e){
            openInfo(content,e)}
        );
    }
    function openInfo(content,e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }
}
function mapClick(map){
    function showInfo(e){
        console.log(e.point.lng + ", " + e.point.lat);
    }
    map.addEventListener("click", showInfo);
}
function mapControl(map){
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));

    var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
    /*缩放控件type有四种类型:
    BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

    //添加控件和比例尺
    map.addControl(top_right_navigation);
}
$(document).ready(function(){
    mapControl(map);                                               //地图控件
    mapClick(map);                                                 //地图点击事件
    // infoWindow(map);                                            //地图标注和窗口信息

});
