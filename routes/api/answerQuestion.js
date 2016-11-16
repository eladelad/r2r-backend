/**
 * Created by elad on 03/11/2016.
 */

var Promise = require('promise');
var express = require('express');
var router = express.Router();
var validator = require('validator');
var Question = require('../../models/question.js');
var User = require('../../models/user.js');
var findUser = require('./userFunctions').findUser;
/* GET home page. */
router.post('/get-question', function(req, res, next) {
    if (req.body.token){
        var token = req.body.token;
        console.log(token);
        findUser(token).then(function (user){
            getNextQuestion(user).then(function(question){
                if (question){
                    delete question.correct;
                    res.json(question);
                } else {
                    res.status(404).json({error: 'no questions found'});
                }
            });
        }, function (err) {
            res.status(400).json({error: err});
        });
    }
});