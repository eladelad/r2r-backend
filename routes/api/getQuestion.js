/**
 * Created by elad on 03/11/2016.
 */

var Promise = require('promise');
var express = require('express');
var router = express.Router();
var validator = require('validator');
var Question = require('../../models/question.js');
var User = require('../../models/user.js');
var findUserById = require('./userFunctions').findUserById;
var getNextQuestion = require('./questionFunctions').getNextQuestion;
var checkUserTime = require('./userFunctions').checkUserTime;

/* GET home page. */
router.post('/get-question', function(req, res, next) {
    if (req.body.token){
        var token = req.body.token;
        console.log(token);
        findUserById(token).then(function (user){
            checkUserTime(user).then(function(user){
                // console.log('found user', user);
                getNextQuestion(user).then(function(question){
                    // console.log(question);
                    if (question){
                        delete question.question.correct;
                        res.json(question);
                    } else {
                        res.status(404).json({errorCode: 1, errorDesc: 'Out of questions'});
                    }
                })
            }, function(err){
                // out of time
                res.status(401).json({errorCode: 2, errorDesc: 'Out of time'})
            });
        }, function (err) {
            // user wasn't found
            res.status(400).json({errorCode: 10, errorDesc: err});
        });
    } else {
        res.status(400).json({errorCode:11, errorDesc:'No Token'});
    }
});

module.exports = router;
