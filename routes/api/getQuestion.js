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

var getNextQuestion = function (user) {
    return new Promise(function (resolve, reject) {
        console.log('searching questions for user', user);
        Question.find(function (err, questions) {
            if (err){
                console.error('error finding questions');
                reject(err);
            } else {
                console.log('found questions', questions);
                questions.forEach(function(question){
                    if (!isAnsweredByUser(user, question.id)) {
                        console.log('found the right question', user.name, question)
                        resolve(question);
                    }
                });
                resolve(null);
            }
        })
    })

};



var isAnsweredByUser = function(user, question_id){
    user.answers.forEach(function(answer){
        if (answer.question == question_id){
            return true
        }
    });
    return false;
};

module.exports = router;
