/**
 * Created by VLER on 2017/8/26.
 */
let getMongoPool = require('../mongo/pool');

module.exports =(req, res, next) => {
    let Enterprise = getMongoPool("cabase").Enterprise;

    let appid = req.headers["appid"] ? req.headers["appid"] : null;

    if(appid){
        // 传了APPID
        Enterprise.findOne({appid: appid}, function (err, item) {
            if (err) {
                res.send(500, err);
            } else {
                if(item){
                    req.ent = item;
                    next();
                }else{
                    res.send(404, '[appid] enterprise does not exist');
                }
            }
        });
    }else{
        res.send(401,'[appid] parameter is missing');
    }
}