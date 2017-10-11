let moment = require('moment');
let Redis = require('ioredis');
let uuid = require('uuid');
let path = require('path');
let rediscfg = require('../../config/redis');

let getMongoPool = require('../../mongo/pool');

let pub = new Redis(rediscfg);

module.exports = function (router) {

    // PaaS -> 重建索引 0：全量重建，1：增量重建
    router.post('/indexs', (req, res, next) => {
        let entid = req.ent.entid;

        let msg = req.body;
        msg.entid = entid;

        console.log(msg);

        pub.publish('RebuildIndex', JSON.stringify(msg));

        res.send(200, true);
    });
}