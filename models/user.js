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
    answers: [{
        date: Date,
        question: { type: Schema.Types.ObjectId, ref: 'Question' },
        answer: { type: Schema.Types.ObjectId },
        correct: Boolean
    }]
});

module.exports = mongoose.model('User', _schema);