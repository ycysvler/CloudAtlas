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
            source:Buffer,                          //  原始i图像
            shape_cut:Buffer,                       //  形状归一图
            color_cut:Buffer,                       //  颜色归一图
            color_feature:Buffer,                   //  颜色特征
            lbp_feature:Buffer,                     //  纹理特征
            shape_feature:Buffer,                   //  形状特征
            deep_feature:Buffer,                    //  深度学习特征
            extend:String,                          //  扩展字段，放个大字符串
            createtime:Date                         //  创建时间
        }); 

        this.Image = conn.model('Image', this.imageSchema);
    }
}

