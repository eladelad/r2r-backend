/**
 * Created by elad on 03/11/2016.
 */

var express = require('express');
var router = express.Router();
var validator = require('validator');
var User = require('../../models/user.js');
var findUserById = require('./userFunctions.js').findUserById;
var findUserByDetails = require('./userFunctions').findUserByDetails;
var Promise = require('promise');

/* GET home page. */
router.post('/user', function(req, res, next) {
    var user_data = req.body;
    if (checkUserDetails(user_data)){
        findUserByDetails(user_data).then(function(user){
            if (user && user._id){
                res.json({token: user._id})
            } else {
                registerUser(user_data).then(function(user){
                    res.json({token: user._id})
                })
            }
        });
    }
});

var registerUser = function(user_data){
    return new Promise(function(resolve, reject){
        user = new User();
        user.mobile = user_data.mobile.replace(/-/, '');
        user.email = user_data.email;
        user.name = user_data.name;
        user.created = new Date().getTime();
        user.save(function (err) {
            if (err) {
                reject(err)
            }
            resolve(user)
        });
    })

};

var checkUserDetails = function(user_data){
    if (!user_data.email || !user_data.mobile || !user_data.name) {
        return false
    }
    var reMobile = /05[0-9]-?\d{7}/i;
    if (!validator.isEmail(user_data.email)){
        return false
    } else if (!user_data.mobile.match(reMobile)){
        return false
    }
    return true
}

router.get('/user', function(req, res, next) {

});


module.exports = router;
