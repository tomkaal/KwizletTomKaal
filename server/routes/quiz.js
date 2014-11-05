/**
 * Created by developer on 4-11-14.
 */


//
//questionRoutes.get('/', function (request, response) {
//    Question
//        .find()
//        .exec(function(err, questions) {
//            if (err) throw err;
//            response.json(questions);
//        });
//});

var Quiz = require('../models/quiz');
var Question = require('../models/question');

var express = require('express');
var router = express.Router();

var controller = require('../controllers/quiz');

router.route('/newquiz')
    .get(controller.retrieveAll)
    .post(controller.createOne);

router.route('/quizes')
    .get(controller.retrieveQuestion);

//router.route('/movies/:id').put(controller.updateOne);
//
//router.route('/movies/:id').get(controller.retrieveOne);
//
//router.route('/movies/:id').delete(controller.deleteOne);

module.exports = router;