var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/kwizletDB');

var Quiz = require('./server/models/quiz');
var Question = require('./server/models/question');

Quiz.remove(function (err, nrDocs) {
    if (err) throw err;
    console.log('REMOVED: ' + nrDocs + ' quizes');


    Question.remove(function (err, nrDocs) {
        if (err) throw err;
        console.log('REMOVED: ' + nrDocs + ' questions');

        console.log('NOW ADDING STUFF');


        var question1 = new Question({
            text: 'doe maar wat',
            answers: [
                {
                    text: 'ok',
                    points: 10,
                    goodAnswer: true
                },
                {
                    text: 'wat dan?',
                    points: 0,
                    goodAnswer: false
                }
            ]
        });

        question1.save(function (err, doc) {
            if (err) throw err;
            console.log(doc);

            var question2 = new Question({
                text: 'Waar woont tom?',
                answers: [
                    {
                        text: 'Stokkum',
                        points: 10,
                        goodAnswer: true
                    },
                    {
                        text: 'Didam',
                        points: 0,
                        goodAnswer: false
                    }
                ]
            });

            question2.save(function (err, doc) {
                if (err) throw err;
                console.log(doc);

                var question3 = new Question({
                    text: 'Waar woont Sanne?',
                    answers: [
                        {
                            text: 'Stokkum',
                            points: 0,
                            goodAnswer: false
                        },
                        {
                            text: 'Didam',
                            points: 10,
                            goodAnswer: true
                        }
                    ]
                });

                question3.save(function (err, doc) {
                    if (err) throw err;
                    console.log(doc);


                });


                quiz1 = new Quiz({
                    name: 'fantastische quiz',
                    questions: [
                        question1._id
                    ]
                });

                quiz1.save(function (err, doc) {
                    if (err) throw err;
                    console.log(doc);
                    quiz2 = new Quiz({
                        name: 'fantastische quiz',
                        questions: [
                            question1._id,
                            question2._id
                        ]
                    });

                    quiz2.save(function (err, doc) {
                        if (err) throw err;
                        console.log('SUCCES!');

                        mongoose.connection.close();
                    });
                });

            });

        });

    });

});