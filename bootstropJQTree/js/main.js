function treeList(){
    $.ajax({
        type: "get",
        url: "tree.json",
        async: true,
        success: function (data) {
            var trees = data.data;
            console.log(trees);
            var treeList = "";
            for(var i=0; i<trees.length;i++){
                treeList += '<li class="parentToggle"><span><i class="glyphicon  glyphicon-folder-open" aria-hidden="true"></i>'+trees[i].Name_Chs+'</span>';
                treeList += '<ul class="change">';
                for(var m=0;m<trees[i].Chillds.length;m++){
                    treeList += ' <li class="test"><span><i class="glyphicon glyphicon-leaf" aria-hidden="true"></i>'+trees[i].Chillds[m].Name_Chs+'</span></li><span style="display: none">'+trees[i].Chillds[m].ID+'</span>';
                }
                treeList += '</ul>';
            }
            treeList += '</li>';
            $("#tree").html(treeList);
            $('#tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('#tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus-sign').removeClass('glyphicon-minus-sign');
                } else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus-sign').removeClass('glyphicon-plus-sign');
                }
                e.stopPropagation();
            });
            $(".test").on("click", function(e){
                var id = $(this).next("span").text();
                $(this).addClass("changeColor").siblings().removeClass("changeColor")
                console.log(id);
                e.stopPropagation();
            })
        },
        error: function(data){
            // console.log(data);
        }
    });

}



$(function () {
    treeList();
});
