/**
 * Created by elad on 03/11/2016.
 */

var express = require('express');
var router = express.Router();
var validator = require('validator');
var User = require('../../models/user.js');
var findUser = require('./userFunctions.js').findUser;

/* GET home page. */
router.post('/user', function(req, res, next) {
    var user_data = req.body;
    var reMobile = /05[0-9]-?\d{7}/i;
    if (!validator.isEmail(user_data.email)){
        res.status(400).send('Email is not valid')
    } else if (!user_data.mobile.match(reMobile)){
        res.status(400).send('Mobile is not valid')
    } else {
        user = new User();
        user.mobile = user_data.mobile.replace(/-/, '');
        user.email = user_data.email;
        user.name = user_data.name;
        User.find({$or: [{mobile: user.mobile}, {email: user.email}]}, function(err, user_search){
            if (err){
                res.statusCode(400).send(err);
            } else if(user_search.length){
                res.json({token: user_search[0].id});
            } else {
                user.save(function (err) {
                    if (err) {
                        console.log("error on saving");
                        res.status(400).send(err);
                        return;
                    }
                    res.json({token: user.id});
                });
            }
        });
    }
});

router.get('/user', function(req, res, next) {

});


module.exports = router;
