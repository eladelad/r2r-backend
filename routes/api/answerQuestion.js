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
var getCodeById = require('./questionFunctions').getCodeById;

router.post('/answer-question', function(req, res, next) {
    if (req.body.token && req.body.question && req.body.answer){
        var ip = getClientAddress(req);
        var token = req.body.token;
        console.log(token);
        findUserById(token).then(function (user){
            answerQuestion(user, req.body.answer, req.body.question, ip).then(function(){
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


router.post('/answer-code', function(req, res, next) {
    if (req.body.token && req.body.code && req.body.answer){
        var token = req.body.token;
        console.log(token);
        findUserById(token).then(function (user){
            answerCode(user, req.body.answer, req.body.code).then(function(){
                console.log('answer code', user, req.body.answer, req.body.code);
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


var getClientAddress = function (req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
};

var answerCode = function(user, user_answer, code_id){
    return new Promise(function(resolve, reject){
        getCodeById(code_id).then(function(code){
            console.log('Found Code');
            user.code_answer.code = code_id;
            user.code_answer.result = user_answer.result;
            user.code_answer.code_text = user_answer.code_text;
            user.code_answer.code = user_answer.result == code.correct;
            user.save();
            resolve();
        }, function(){
            console.log('no code');
            reject();
        });

    })
};

var answerQuestion = function(user, user_answer, question_id, ip){
    return new Promise(function (resolve, reject){
        getQuestionById(question_id).then(function(question){
            // console.log(question);
            question.inputs.forEach(function(answer){
                console.log(user_answer, answer.key);
                if (user_answer[answer.key]){
                    db_answer = {question: question.id, answer: answer.id, date: new Date().getTime()};
                    db_answer.correct = question.correct === user_answer[answer.key];
                    if (answer.key === 'ext_ip'){
                        if (ip === user_answer[answer.key]){
                            db_answer.correct = true;
                        }
                    }
                    db_answer.text = user_answer[answer.key];
                    db_answer.ip = ip;
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
