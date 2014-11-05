/**
 * Created by Sann on 30/10/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new Schema({
    quizId: {type:String, required: true},
    studentName: {type:String, required: true},
    score: {type:Number, required: true}
});

module.exports = mongoose.model('Result', resultSchema);