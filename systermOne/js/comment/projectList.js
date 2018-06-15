var ProjectListA;
var list = [];
function ProjectList(option){
    for(var i=0;i<option.length;i++){
        this.id = option[i].id;
        this.initial = option[i].initial;
        this.keyword = option[i].keyword;
        this.geo = option[i].geo;
        list.push({id:option[i].id,initial:this.keyword,keyword:this.keyword,geo:option[i].geo});
    }
    return list;
}

ProjectList.prototype.geoPoint = function(){
    // console.log(this);
};

// function goods(item1,item2){
//     return {"ItemId":item1,"SelectId":item2};
// }
// function Test(){
//     //定义存放函数对象的数组
//     var array = new Array();
//     //循环5次追加数据到数组中
//     for(var i=0;i<5;i++){
//         array.push(goods((i+1),(i+10)));
//     }
//     //循环查看
//     for(var j=0;j<array.length;j++){
//         console.log(array[j]);
//     }
// }

