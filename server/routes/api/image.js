/**
 * Created by VLER on 2017/8/8.
 */

let multiparty = require('multiparty');
let moment = require('moment');
let uuid = require('uuid');
var path = require('path');
let fs = require('fs');

let getMongoPool = require('../../mongo/pool');

module.exports = function (router) {
    router.get('/enterprises/:entid/images', (req, res, next) => {
        let entid = req.params.entid;
        let Image = getMongoPool(entid).Image;
        Image.find(function (err, items) {
            res.json(items);
        });
    });

    router.get('/enterprises/:entid/images/:image', (req, res, next) => {
        let entid = req.params.entid;
        let Image = getMongoPool(entid).Image;
        Image.findOne({image:req.params.image},function(err, item){
            res.json(item);
        });
    });

    router.post('/enterprises/:entid/images', (req, res, next) => {
        let entid = req.params.entid;
        let Image = getMongoPool(entid).Image;

        var form = new multiparty.Form({uploadDir: './public/upload/'});

        form.parse(req, function (err, fields, files) {

            var resolvepath;

            for (var name in files) {
                let item = files[name][0];
                resolvepath = path.resolve(item.path);
            }

            let file = path.resolve(resolvepath);
            fs.readFile(file, function (err, chunk) {
                if (err)
                    return console.error(err);

                let item = new Image();
                item.createtime = new moment();
                item.source = chunk;
                // 如果有类型和扩展信息，那就加上吧
                item.type = fields.type ? fields.type[0]:null;
                item.extend = fields.extend ? fields.extend[0]:null;

                item.save(function (err, item) {
                    fs.unlink(file,()=>{});
                    res.send(200,true);
                });
            });
        });
    });

}