/**
 * Created by VLER on 2017/8/8.
 */

let getMongoPool = require('../../mongo/pool');

let Config = getMongoPool().Config;
let uuid = require('uuid');
let moment = require('moment');

module.exports = function (router) {
    router.route('/config')
        .get(function (req, res, next) {
            Config.find(function(err, items){
                res.json(items);
            });
        });
    router.route('/config/:package')
        .get(function (req, res, next) {
            Config.findOne({package:req.params.package},function(err, item){
                res.json(item);
            });
        });

    router.post('/config', (req, res, next)=> {
        let item = new Config(req.body);
        item.createtime = new moment();
        item.save(function(err, item){
            res.json(item);
        });
    });

    router.put('/config/:package', (req, res, next)=> {
        Config.findOneAndUpdate({ "package":req.params.package }, req.body, function (err, item) {
            res.send(200, true);
        });
    });

    router.delete('/config/:package',(req, res, next)=>{
        Config.remove({ "package":req.params.package }, function (err) {
            if (err) return handleError(err);
            res.send(200,true);
        });
    });
}