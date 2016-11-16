/**
 * Created by elad on 15/11/2016.
 */

var Promise = require('promise');
var User = require('../../models/user.js');

var findUser = function(token){
    console.log('finding user with token', token);
    return new Promise(function(resolve, reject){
        User.findById(token, function (err, user) {
            if (err || !user){
                console.log('error finding user with token', token, err);
                reject(err || 'no user found');
            } else {
                console.log('found user with token', token, user);
                resolve(user);
            }
        });
    });
};

exports.findUser = findUser;