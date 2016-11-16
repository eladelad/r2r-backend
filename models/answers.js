/**
 * Created by elad on 03/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _schema = new Schema({
});

module.exports = mongoose.model('Answer', _schema);