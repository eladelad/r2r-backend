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
var getQuestionById = require('./questionFunctions').getQuestionById;
/* GET home page. */
router.post('/answer-question', function(req, res, next) {
    if (req.body.token && req.body.question && req.body.answer){
        var token = req.body.token;
        console.log(token);
        findUserById(token).then(function (user){
            answerQuestion(user, req.body.answer, req.body.question).then(function(){
                res.json({success: true});
            }, function(err){
                res.status(400).json({error: err});
            });
        }, function (err) {
            res.status(400).json({error: err});
        });
    } else {
        res.status(400).json({error: 'Missing input'})
    }
});


var answerQuestion = function(user, user_answer, question_id){
    return new Promise(function (resolve, reject){
        getQuestionById(question_id).then(function(question){
            // console.log(question);
            question.inputs.forEach(function(answer){
                console.log(user_answer, answer.key);
                if (user_answer[answer.key]){
                    db_answer = {question: question.id, answer: answer.id, date: new Date().getTime()};
                    db_answer.correct = question.correct === user_answer[answer.key];
                    user.answers.push(db_answer);
                    user.save();
                    resolve()
                }
            });
            reject('The submitted answer was not one of the options');
        })
    })
};

module.exports = router;
