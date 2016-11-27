/**
 * Created by elad on 03/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _schema = new Schema({
    mobile: {type: String, index: {unique: true}},
    email: {type: String, index: {unique: true}},
    name: String,
    created: Date,
    start_time: Date,
    start_time_code: Date,
    answers: [{
        date: Date,
        text: String,
        ip: String,
        question: { type: Schema.Types.ObjectId, ref: 'Question' },
        answer: { type: Schema.Types.ObjectId },
        correct: Boolean
    }],
    code_answer: {
        code: { type: Schema.Types.ObjectId, ref: 'Code' },
        result: String,
        code_text: String,
        correct: Boolean
    }
});

module.exports = mongoose.model('User', _schema);