var firstLoad = 0;
var ico_btn_cnt = 0;
var g_bjuuid = '';

var map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(116.32412, 39.97512), 12);
map.addControl(new BMap.MapTypeControl());
map.enableScrollWheelZoom(true);
var locIcon = new BMap.Icon("./easyui/themes/icons/location.gif", new BMap.Size(60,120), { // 宽29 - 29/2,高60 + 60
    offset: new BMap.Size(0, 0), // 指定定位位置
    imageOffset: new BMap.Size(14, 0) // 设置图片偏移
});
//locIcon.setOffset(0,0);


var tileLayer = new BMap.TileLayer({isTransparentPng: true});
tileLayer.getTilesUrl = function(tileCoord, zoom) {
    var x = tileCoord.x;
    var y = tileCoord.y;
    return './map/baidu/5881c971a9ac3/' + zoom + '/tile' + x + '_' + y + '.png';
}
map.addTileLayer(tileLayer);

var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
map.addControl(top_left_control);

var navigationControl = new BMap.NavigationControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    type: BMAP_NAVIGATION_CONTROL_ZOOM
});
map.addControl(navigationControl);

//--------------------------------
function ZoomControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(11, 100);
}
ZoomControl.prototype = new BMap.Control();
ZoomControl.prototype.initialize = function(map){
    var div = document.createElement("div");
    div.style.cursor = "pointer";
    div.style.border = "1px solid gray";
    div.style.borderRadius = "5px";
    div.style.width = "33px";
    div.style.height = "33px";
    div.style.background = "url(./easyui/images/location.jpg) no-repeat";
    div.onclick = function(e){
//map.clearOverlays();
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point,{icon:locIcon});
//mk.setAnchor(0.5f,0.5f);
//mk.setOffset(15,-300);

                map.addOverlay(mk);
                map.panTo(r.point);
            }
            else {
                alert('failed:'+this.getStatus());
            }
        },{enableHighAccuracy: true})

    }
    map.getContainer().appendChild(div);
    return div;
}
var myZoomCtrl = new ZoomControl();
map.addControl(myZoomCtrl);

//-----------------------------------------------------------

var selNodePois = "（112.969852，22.953055）；（113.001473，22.94773）；（113.00636，22.92856）；（112.990549，22.91418）；（112.965828，22.917642）；（112.960941，22.93921）；"; // 边界字符串
var newpoint;   // 一个经纬度

selNodePois = selNodePois.replace(/（/g, ''); // 替换中文左括号
selNodePois = selNodePois.replace(/）/g, ''); // 替换中文右括号

// 处理后，中间中文逗号分割，形如：
// strArray[0] = 116.335961，39.930249
// strArray[1] = 116.338094，39.930173
var lastIndex = selNodePois.lastIndexOf('；');
if (lastIndex > -1) {
    selNodePois = selNodePois.substring(0, lastIndex);
}

var strArray = selNodePois.split("；");
var points = [];
for(var i=0; i<strArray.length; i++){
    var tmpArray = strArray[i].split("，");
    newpoint = new BMap.Point(Number(tmpArray[0]), Number(tmpArray[1]));
    points.push(newpoint);  //将新增的点放到数组中
}

//	定位到显示范围
map.addEventListener("tilesloaded",function(){
    if (firstLoad == 0)
    {
        map.setViewport(points);
        firstLoad = 1;
    }

});



function classifyIconFind(){
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;

    iw = document.body.clientWidth;
    il = Math.round(iw/2);

    if (ico_btn_cnt == 0)
    {
        this.defaultOffset = new BMap.Size(il - 16 * 3, 80);
    }
    else if (ico_btn_cnt == 1)
    {
        this.defaultOffset = new BMap.Size(il + 16 * 1, 80);
    }
    else if (ico_btn_cnt == 2)
    {
        this.defaultOffset = new BMap.Size(il + 16 * 5, 80);
    }
    else if (ico_btn_cnt == 3)
    {
        this.defaultOffset = new BMap.Size(il + 16 * 9, 80);
    }
    else if (ico_btn_cnt == 4)
    {
        this.defaultOffset = new BMap.Size(il - 16 * 3, 40);
    }
    else if (ico_btn_cnt == 5)
    {
        this.defaultOffset = new BMap.Size(il + 16 * 1, 40);
    }
    else if (ico_btn_cnt == 6)
    {
        this.defaultOffset = new BMap.Size(il + 16 * 5, 40);
    }
    else if (ico_btn_cnt == 7)
    {
        this.defaultOffset = new BMap.Size(il + 16 * 9, 40);
    }
}

classifyIconFind.prototype = new BMap.Control();
classifyIconFind.prototype.initialize = function(map){
    var div = document.createElement("div");
    div.style.cursor = "pointer";
    div.style.border = "1px solid gray";
    div.style.borderRadius = "8px";
    div.style.width = "32px";
    div.style.height = "32px";
    //div.style.background = "#4e8999 url(./easyui/images/search32.png) no-repeat";
    div.style.background = "#4e8999";
    div.innerHTML = "<div class='nText'>搜索</div>";

    div.onclick = function(e){
        //addMarkersInBianjie('', '');
        var intput_val = prompt("请输入待搜索部分或全部名称","");
        doSearch('', intput_val);
    }
    map.getContainer().appendChild(div);
    return div;
}
var myclassifyIconFind = new classifyIconFind();
map.addControl(myclassifyIconFind);

//alert(ico_btn_cnt);

//-----------------------------------------------------------

// 根据位置编号 wzid 取得位置详细信息
function get_weizhi_detail(v_wzid){
// 加载文字说明
    var pp = $("#weizhi_detail").accordion('getPanel',0); //accordion('getPanel(1)');
    if (pp){
        pp.panel('refresh','bianjie_show_ent.php?ac=g_shuoming&wzid='+v_wzid);
    }

// 加载具有该位置编号的所有图片
    var pp = $("#weizhi_detail").accordion('getPanel',1); //accordion('getPanel(1)');
    if (pp){
        pp.panel('refresh','bianjie_show_ent.php?ac=g_pic&wzid='+v_wzid);
    }

// 加载具有该位置编号的所有音频
    var pp = $("#weizhi_detail").accordion('getPanel',2); //accordion('getPanel(1)');
    if (pp){
        pp.panel('refresh','bianjie_show_ent.php?ac=g_wav&wzid='+v_wzid);
    }

}

// 重置地图
function reset_map(){
    map.clearOverlays();

//	定位到显示范围
    map.setViewport(points);
    firstLoad = 1;
}

function openPhotoSwipe(var_picurl, var_picsize_w, var_picsize_h){
//alert(var_picurl+' '+var_picsize_w+' '+var_picsize_h);

    var pswpElement = document.querySelectorAll('.pswp')[0];

    var items = [
        {
            src: var_picurl,
            w: var_picsize_w,
            h: var_picsize_h
        }
    ];

// define options (if needed)
    var options = {
        // history & focus options are disabled on CodePen
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

    gallery.init();
};

// 增加一个类别的所有位置点
// 变量说明：
// var_bjuuid : 边界uuid
// var_wzlx: 位置类型
function addMarkersInBianjie(var_bjuuid, var_wzlx){

    points = [];
    map.clearOverlays();

    $.get("bianjie_show_ent.php", { ac: "g1", bjuuid: var_bjuuid, lx: var_wzlx },
        function(data){
            var dataObj=eval("("+data+")"); //转换为json对象
            $(dataObj).each(function(){
                //alert(this.wzid+' '+this.wzmc);
                var point = new BMap.Point(Number(this.lng), Number(this.lat));
                points.push(point);
                var marker = new BMap.Marker(point);

                var sTipContent =
                    "<div style='width:200px;height:80px;'>" +
                    "<div style='font-size:16px;'>#tip_title#</div>" +
                    "<div style='width:200px;color:#fc9401;font-size:14px;white-space:normal;word-wrap:break-word;'>#tip_content#</div>" +
                    "<div style='padding:8px 0px 0 10px;float:right;display:inline;font-size:16px;'><a href='#panel_weizhi_detail' onclick=get_weizhi_detail('"+this.wzid+"')>详细...</a></div>";

                if (Number(this.ifhaspic)>0)
                {
                    sTipContent = sTipContent + "<div style='padding:3px;float:right;display:inline'><img src='./easyui/themes/icons/have_img_color30.gif' /></div>" ;
                }else{
                    sTipContent = sTipContent + "<div style='padding:3px;float:right;display:inline'><img src='./easyui/themes/icons/have_img_gray30.gif' /></div>" ;
                }

                if (Number(this.ifhaswav)>0)
                {
                    sTipContent = sTipContent + "<div style='padding:3px;float:right;display:inline'><img src='./easyui/themes/icons/have_wav_color30.gif' /></div>";
                }else{
                    sTipContent = sTipContent + "<div style='padding:3px;float:right;display:inline'><img src='./easyui/themes/icons/have_wav_gray30.gif' /></div>";
                }

                sTipContent = sTipContent.replace('#tip_title#', this.wzmc);
                sTipContent = sTipContent.replace('#tip_content#', this.sm.substr(0,19)); //this.sm.substr(0,19)
//sTipContent = sTipContent.replace('#picurl#', this.picurl);

//var sTipContent = s_wzmc;

                map.addOverlay(marker);
                var infoWindow = new BMap.InfoWindow(sTipContent);  // 创建信息窗口对象
                marker.addEventListener("click", function(){
                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                });



                //var point = new BMap.Point(Number(this.lng), Number(this.lat));
                //points.push(point);
                //var marker = new BMap.Marker(point);

//var sTipContent =
//"<div id='tip_window'>" +
//"<div id='tip_title'>#tip_title#</div>" +
//"<div class='tip_content'>#tip_content#</div>" +
////"<div id='tip_content'>内容</div>" +
//"</div>";

//sTipContent = sTipContent.replace('#tip_title#', this.wzmc);
//sTipContent = sTipContent.replace('#tip_content#', this.sm);

//map.addOverlay(marker);
//var infoWindow = new BMap.InfoWindow(sTipContent);  // 创建信息窗口对象
//marker.addEventListener("click", function(){
//map.openInfoWindow(infoWindow, point); //开启信息窗口
//});

            });
            map.setViewport(points);
        });
}

// 搜索
function doSearch(v_g_bjuuid, v_intput_val){
//alert(v_g_bjuuid + '=' + v_intput_val);
    points = [];
    map.clearOverlays();

    $.get("bianjie_show_ent.php", { ac: "s1", bjuuid: v_g_bjuuid, v: v_intput_val},
        function(data){

            var dataObj=eval("("+data+")"); //转换为json对象
            $(dataObj).each(function(){
                //alert(this.wzid+' '+this.wzmc);
                var point = new BMap.Point(Number(this.lng), Number(this.lat));
                points.push(point);
                var marker = new BMap.Marker(point);

                var sTipContent =
                    "<div style='width:200px;height:80px;'>" +
                    "<div style='font-size:16px;'>#tip_title#</div>" +
                    "<div style='width:200px;color:#fc9401;font-size:14px;white-space:normal;word-wrap:break-word;'>#tip_content#</div>" +
                    "<div style='padding:8px 0px 0 10px;float:right;display:inline;font-size:16px;'><a href='#panel_weizhi_detail' onclick=get_weizhi_detail('"+this.wzid+"')>详细...</a></div>";

                if (Number(this.ifhaspic)>0)
                {
                    sTipContent = sTipContent + "<div style='padding:3px;float:right;display:inline'><img src='./easyui/themes/icons/have_img_color30.gif' /></div>" ;
                }else{
                    sTipContent = sTipContent + "<div style='padding:3px;float:right;display:inline'><i…
