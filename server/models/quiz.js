/**
 * Created by Sann on 30/10/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
    name: {type:String, required: true},
    questions: [{type:Schema.Types.ObjectId, ref:'Question'}]
});

module.exports = mongoose.model('Quiz', quizSchema);