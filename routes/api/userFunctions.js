/**
 * Created by elad on 15/11/2016.
 */

var moment = require('moment');
var Promise = require('promise');
var User = require('../../models/user.js');
var minutes = require('./conf').minutes;

var findUserById = function(token){
    // console.log('finding user with token', token);
    return new Promise(function(resolve, reject){
        User.findById(token, function (err, user) {
            if (err || !user){
                // console.log('error finding user with token', token, err);
                reject(err || 'no user found');
            } else {
                // console.log('found user with token', token, user);
                resolve(user);
            }
        });
    });
};

var findUserByDetails = function(user_data){
    return new Promise(function(resolve, reject){
        user = new User();
        user.mobile = user_data.mobile.replace(/-/, '');
        user.email = user_data.email;
        user.name = user_data.name;
        User.find({$or: [{mobile: user.mobile}, {email: user.email}]}, function(err, user_search){
            if (err)reject(err);
            if(user_search.length){
                resolve(user_search[0]);
            } else {
                resolve(null);
            }
        });
    })
};

var updateUserStartTime = function(user){
    return new Promise(function(resolve, reject){
        user.start_time = new Date().getTime();
        user.save(function (err) {
            if (err) {
                reject(err)
            }
            resolve(user)
        });
    });
};


var checkUserTime = function(user){
    return new Promise(function(resolve, reject){
        if (!user.start_time){
            console.log("no time");
            updateUserStartTime(user).then(function(user) { console.log(user); resolve(user) })
        } else {
            var started = moment(user.start_time, 'YYYY-M-DD HH:mm:ss');
            var now = moment();
            var timeSinceStarted = moment(now).diff(started, 'minutes');
            if (timeSinceStarted > minutes){
                reject()
            } else {
                resolve(user);
            }
        }
    })
};


exports.findUserById = findUserById;
exports.findUserByDetails = findUserByDetails;
exports.checkUserTime = checkUserTime;