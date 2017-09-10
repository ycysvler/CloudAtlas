let moment = require('moment');
let uuid = require('uuid');
var path = require('path');

let getMongoPool = require('../../mongo/pool');

module.exports = function (router) {

    // PaaS -> 新建类型
    router.post('/types', (req, res, next) => {
        let entid = req.ent.entid;
        let ImageType = getMongoPool(entid).ImageType;

        /* 待实现 */
    });

    // PaaS -> 获取类型列表
    router.get('/types', (req, res, next) => {
        let entid = req.ent.entid;
        let ImageType = getMongoPool(entid).ImageType;

        /* 待实现 */
    });

    // PaaS -> 获取类型列表
    router.delete('/types/:code', (req, res, next) => {
        let entid = req.ent.entid;
        let code = req.params.code;
        let ImageType = getMongoPool(entid).ImageType;

        /* 待实现 */
        /* 同时要删除与此类型相对应的索引信息  */
        /* 同时要删除与此类型相对应的索引文件  */
        /* 同时要删除与此类型相对应的图像信息  */
    });
}