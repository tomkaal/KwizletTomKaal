var mongoose = require('mongoose')
    , Quiz = mongoose.model('Quiz')
      Question = mongoose.model('Question');


exports.retrieveAll = function (req, res) {
    Quiz.find(function (err, quizes) {
        if (err) {
            return res.send(err);
        }

        res.json(quizes);
    });
};

exports.retrieveAll = function (req, res) {
    Question.find(function (err, questions) {
        if (err) {
            return res.send(err);
        }

        res.json(questions);
    });
};

exports.retrieveQuestion = function (request, response) {
    Quiz
        .find()
        .populate('questions')
        .exec(function(err, data) {
            if (err) throw err;
            response.json(data);
        });
};

exports.createOne = function (req, res) {
    var quiz = new Quiz(req.body);

    Quiz.save(function (err) {
        if (err) {
            return res.send(err);
        }

        res.send({
            result: {
                code: 0,
                message: 'quiz added!'
            }
        });
    });
};

//exports.retrieveOne = function (req, res) {
//    Movie.findOne({ _id: req.params.id}, function (err, movie) {
//        if (err) {
//            return res.send(err);
//        }
//
//        res.json(movie);
//    });
//};
//
//exports.createOne = function (req, res) {
//    var movie = new Movie(req.body);
//
//    movie.save(function (err) {
//        if (err) {
//            return res.send(err);
//        }
//
//        res.send({
//            result: {
//                code: 0,
//                message: 'Movie added!'
//            }
//        });
//    });
//};
//
//exports.updateOne = function (req, res) {
//    Movie.findOne({ _id: req.params.id}, function (err, movie) {
//        if (err) {
//            return res.send(err);
//        }
//
//        for (prop in req.body) {
//            movie[prop] = req.body[prop];
//        }
//
//        movie.save(function (err) {
//            if (err) {
//                return res.send(err);
//            }
//
//            res.send({
//                result: {
//                    code: 0,
//                    message: 'Movie updated!'
//                }
//            });
//        });
//    });
//};
//
//exports.deleteOne = function (req, res) {
//    Movie.remove({
//        _id: req.paras.id
//    }, function (err, movie) {
//        if (err) {
//            return res.send(err);
//        }
//
//        for (prop in req.body) {
//            movie[prop] = req.body[prop];
//        }
//
//        res.json({
//            result: {
//                code: 0,
//                message: 'Movie deleted!'
//            }
//        });
//    });
//};