/**
 * Created by elad on 26/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _schema = new Schema({
    description: String,
    correct: String

});

module.exports = mongoose.model('Code', _schema);