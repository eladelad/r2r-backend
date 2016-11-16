/**
 * Created by elad on 03/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _schema = new Schema({
    description: String,
    inputs: [{
        key : String,
        text : String,
        type: { type: String }
    }],
    photo: String,
    correct: String

});

module.exports = mongoose.model('Question', _schema);