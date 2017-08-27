/**
 * Created by VLER on 2017/8/26.
 */

let getMongoPool = require('../mongo/pool');

module.exports = (req, res, next) => {
    let Enterprise = getMongoPool("cabase").Enterprise;
    // format ip
    let ip = req.ip.replace('::ffff:', '');
    console.log('req entid:', req.entid);
    Enterprise.findOne({entid: req.entid}, function (err, item) {

        if (err) {
            console.log('ip err:', err);
            res.send(500, err);
        } else {

            if (item.ips.includes(ip) || ip === '::1') {
                next();
            } else {
                res.send(403.7, '非法请求！');
            }
        }
    });
}

