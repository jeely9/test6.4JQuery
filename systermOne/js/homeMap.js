var map = new BMap.Map("homeMap");                               // 创建Map实例
var point = new BMap.Point(121.480237,31.236305);                //定义一个中心点
map.centerAndZoom(point,15);
var data_info = [
    // [121.477594, 31.239078,"地址：人民广场"],
    // [121.466095, 31.233644,"地址：南京西路"],
    [121.387134, 31.336926,"上海十二号线"]
];
function clickRight(map){
    for(var i=0;i<data_info.length;i++) {
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]));
        var markerMenu=new BMap.ContextMenu();
        marker.addEventListener("rightclick",function(){
            this.addContextMenu(markerMenu);//给标记添加右键菜单
        });
        map.addOverlay(marker);
        markerMenu.addItem(new BMap.MenuItem('进入项目',EventMarker.bind(map)));
        marker.addContextMenu(markerMenu);
        function EventMarker(map){
            console.log(map);
            window.location.href="main.html";
        }
    }
}
function mapStyle(map){
    var myStyleJSon = [
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": {
                "color": "#021019"
            }
        },
        {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#000000"
            }
        },
        {
            "featureType": "highway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#147a92"
            }
        },
        {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#000000"
            }
        },
        {
            "featureType": "arterial",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#0b3d51"
            }
        },
        {
            "featureType": "local",
            "elementType": "geometry",
            "stylers": {
                "color": "#000000"
            }
        },
        {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
                "color": "#08304b"
            }
        },
        {
            "featureType": "railway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#000000"
            }
        },
        {
            "featureType": "railway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#08304b"
            }
        },
        {
            "featureType": "subway",
            "elementType": "geometry",
            "stylers": {
                "lightness": -70
            }
        },
        {
            "featureType": "building",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#000000"
            }
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#857f7f"
            }
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#000000"
            }
        },
        {
            "featureType": "building",
            "elementType": "geometry",
            "stylers": {
                "color": "#022338"
            }
        },
        {
            "featureType": "green",
            "elementType": "geometry",
            "stylers": {
                "color": "#062032"
            }
        },
        {
            "featureType": "boundary",
            "elementType": "all",
            "stylers": {
                "color": "#1e1c1c"
            }
        },
        {
            "featureType": "manmade",
            "elementType": "geometry",
            "stylers": {
                "color": "#022338"
            }
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#2da0c6",
                "visibility": "on"
            }
        }
    ];
    map.setMapStyle({styleJson: myStyleJSon });
}
function infoWindow(map){
    var opts = {
        width : 282,     // 信息窗口宽度
        height: 180,     // 信息窗口高度
        // title : "信息窗口" , // 信息窗口标题
        enableMessage:true//设置允许信息窗发送短息
    };
    for(var i=0;i<data_info.length;i++){
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
        var title = data_info[i][2];
        var content ="";
        content +=    "<div class='infoBox'><h4 class='infoTitle'>"+ title +"</h4>" +
            "<p class='process'>工程进度:</p>" +"<p class='mointor'>监测状态:</p>"+
            "</div>";
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
    mapControl(map);                                                    //地图控件
    mapClick(map);                                                      //地图点击事件
    infoWindow(map);                                                    //地图标注和窗口信息
    clickRight(map);                                                    //右键点击菜单
    // mapStyle(map);                                                   //地图换肤颜色设置
});
