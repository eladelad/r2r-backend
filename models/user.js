/**
 * Created by elad on 03/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _schema = new Schema({
    mobile: {type: String, index: {unique: true}},
    email: {type: String, index: {unique: true}},
    name: String,
    answers: [{
        question: { type: Schema.Types.ObjectId, ref: 'Question' },
        answer: { type: Schema.Types.ObjectId, ref: 'Category' }
    }]
});

module.exports = mongoose.model('User', _schema);