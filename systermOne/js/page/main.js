








function menuList(){
    $("#systemSetting").setTable();
}

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
    menuList();
});
