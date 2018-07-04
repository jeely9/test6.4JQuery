var ProjectListA;
var list = [];
function ProjectList(option){
    for(var i=0;i<option.length;i++){
        this.ID = option[i].ID;
        this.Name = option[i].Name;
        this.CODE = option[i].CODE;
        this.ProjectTitle = option[i].ProjectTitle;
        this.AnalysisService = option[i].AnalysisService;
        this.DBID = option[i].DBID;
        this.DefaultMapID = option[i].DefaultMapID;
        this.FileService = option[i].FileService;
        this.ModuleIDs = option[i].ModuleIDs;
        this.Remark = option[i].Remark;
        this.X = option[i].X;
        this.Y = option[i].Y;
        list.push({ID:this.ID,Name:this.Name,CODE:this.CODE,ProjectTitle:this.ProjectTitle,
            AnalysisService:this.AnalysisService,DBID:this.DBID,DefaultMapID:this.DefaultMapID,
            FileService:this.FileService,ModuleIDs:this.ModuleIDs,Remark:this.Remark,X:this.X,Y:this.Y});
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

