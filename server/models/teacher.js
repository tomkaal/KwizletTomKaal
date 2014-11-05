/**
 * Created by Sann on 30/10/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
        username: {type:String, required: true, unique:true},
        password: {type:String, required: true}
});

module.exports = mongoose.model('Teacher', teacherSchema);