/**
 * Created by elad on 03/11/2016.
 */

var express = require('express');
var router = express.Router();
var Question = require('../../models/question')

/* GET home page. */
router.post('/add-question', function(req, res, next) {
    console.log(req.body);
    if (req.body.question){
        var question = new Question();
        question.description = req.body.question.description;
        question.correct = req.body.question.correct;
        question.inputs = req.body.question.inputs;
        if (req.body.question.photo){
            question.photo = req.body.question.photo;
        }
        question.save(function (err) {
            if (err){
                console.log(err);
                res.status(400).send(err);
            }
            res.json(question);

        });

    } else {
        console.log('no questions');
        res.sendStatus(400);
    }
});

module.exports = router;
