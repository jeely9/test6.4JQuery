var projectA;
var chirdren;
function Borehole(option) {
    this.Top = option.Top || null;
    this.Base = option.Base || null;
    this.Mileage = option.Mileage || null;
    this.Type = option.Type || null;
    this.geologies = option.geologies || null;
    this.id = option.id || null;
    this.name = option.name || null;
    this.fullname = option.fullname || null;
    this.description = option.description || null;
}
Borehole.prototype.top = function(){
    // console.log(this.Top);
};
function BoreholeGeo(option){
    this.Top = option.Top;
    this.Base = option.Base;
    this.StratumID = option.StratumID;
}
BoreholeGeo.prototype.id = function(){
    // console.log(this);
};
Borehole.prototype.geo = function(){
    var lists = this.geologies;
    console.log(lists);
};

