/**
 * Created by elad on 16/11/2016.
 */

var Promise = require('promise');
var User = require('../../models/user.js');
var Question = require('../../models/question');
var minutes = require('./conf').minutes;


var getNextQuestion = function (user) {
    return new Promise(function (resolve, reject) {
        // console.log('searching questions for user', user);
        Question.find(function (err, questions) {
            if (err){
                console.error('error finding questions');
                reject(err);
            } else {
                // console.log('found questions', questions);
                questions.forEach(function(question){
                    if (isAnsweredByUser(user, question) == false) {
                        // console.log('found the right question', user.name, question.description);
                        // console.log(questions.length, user.answers.length);
                        var startTime = new Date(Date.parse(user.start_time));
                        var endTime = new Date(startTime.getTime() + (1000 * 60 * minutes));
                        var question = {
                            total: questions.length,
                            progress: user.answers.length,
                            started: user.start_time,
                            end: endTime,
                            question: question
                        };
                        resolve(question);
                    }
                });
                resolve(null);
            }
        })
    })
};

var getQuestionById = function (question_id) {
    return new Promise(function (resolve, reject) {
        Question.findById(question_id, function (err, question) {
            if (err || !question){
                reject(err || 'no question found');
            } else {
                resolve(question);
            }
        })
    })
};

var isAnsweredByUser = function(user, question){
    var answered = false;
    user.answers.forEach(function(answer){
        // console.log(answer.question, question.id.replace("'", ""));
        if (answer.question == question.id){
            answered = true;
        }
    });
    // console.log(answered);
    return answered
};

exports.getNextQuestion = getNextQuestion;
exports.getQuestionById = getQuestionById;