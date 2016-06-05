$(function(){
    var questionsPromise = getQuestions();
    var answersPromise = getAnswers();
    Promise.all([questionsPromise, answersPromise])
        .then(function(res){
            var questions = res[0];
            var answersRes = res[1];
            var answers = prepareAnswers(questions, answersRes);
            var parent = $('#answersDiv');

            var rangeQuestions = questions.filter(q => q.type == 'range');
            rangeQuestions.forEach(q => {
                var rangeAnswers = answers.map(a => {
                    var questionAnswer = a.answers.filter(a => a.id == q.id)[0];
                    return questionAnswer && questionAnswer.answer;
                });
                var avg = rangeAnswers.reduce((prev, next) => prev + next, 0) / rangeAnswers.length;
                q.avg = Math.round(avg * 100) / 100;
            });
            var avgTmpl = $("#avgTemplate").html();
            parent.append(Mustache.render(avgTmpl, {
                rangeQuestions: rangeQuestions,
            }));

            var tmpl = $("#answersTemplate").html();
            parent.append(Mustache.render(tmpl, {
                questions: questions,
                results: answers
            }));
        });
});

function prepareAnswers(questions, answersEntries) {
    answersEntries.forEach(function(answerEntry) {
        answerEntry.answers.forEach(function(answer) {
            answer.question = questions.find(q => q.id == answer.id);
            if (answer.type == 'free') {
                answer.text = answer.answer;
            } else if (answer.type == 'multiple') {
                answer.text = answer.question.answers
                    .filter(a => answer.answer && answer.answer.indexOf(a.id) >= 0)
                    .map(a => a.text)
                    .join('\n');
            } else if (answer.type == 'range') {
                answer.answer = parseInt(answer.answer);
                answer.text = answer.answer;
            } else if (answer.type == 'radio') {
                answer.text = answer.question.answers
                    .find(a => answer.answer == a.id)
                    .text;
            }
        });
    });
    return answersEntries;
}

function getAnswers() {
    return Promise.resolve($.get("/answers"));
}
