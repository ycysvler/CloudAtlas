var mongodbconfig = require('../config/mongodb');
var mongoose = require('mongoose');

module.exports = class Schemas{
    constructor(entid){
        let uri = mongodbconfig.uri + entid;
        let conn = mongoose.createConnection(uri, mongodbconfig.options);

        conn.then(function(db) {
            console.log("ent mongodb connected!");
        });

        this.imageSchema = new mongoose.Schema({
            name: {type: String,index: true},       // 图片名称
            type: {type: String,index: true},       // 业务类型
            colour:{type: Number,index: true},      // 业务类型
            state:{type: Number,index: true},       // 状态 0:新图，1:正在计算特征，2：计算特征成功，-1：计算特征失败
            source:Buffer,
            shape_cut:Buffer,
            color_cut:Buffer,
            color_feature:Buffer,
            lbp_feature:Buffer,
            shape_feature:Buffer,
            deep_feature:Buffer,
            extend:String,                          // 扩展字段，放个大字符串
            createtime:Date                         // 创建时间
        }); 

        this.Image = conn.model('Image', this.imageSchema);
    }
}

