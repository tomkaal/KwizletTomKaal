/**
 * Created by Sann on 30/10/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    text: {type: String, required: true},
    answers: [{
        text: {type:String, required: true},
        points: {type:Number},
        goodAnswer: {type:Boolean}
    }]
});

module.exports = mongoose.model('Question', questionSchema);