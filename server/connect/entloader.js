/**
 * Created by VLER on 2017/8/26.
 */
module.exports =(req, res, next) => {
    req.entid = 'ent_20170826210897';
    console.log('ent:', req.entid);
    next();
}