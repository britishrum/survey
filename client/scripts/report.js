$(function(){
    var questionsPromise = getQuestions();
    var answersPromise = getAnswers();
    Promise.all([questionsPromise, answersPromise])
        .then(function(res){
            var questions = res[0];
            var answersRes = res[1];
            var answers = prepareAnswers(questions, answersRes);
            var tmpl = $("#answersTemplate").html();
            $('#answersDiv').append(Mustache.render(tmpl, {
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
                    .filter(a => answer.answer.indexOf(a.id) >= 0)
                    .map(a => a.text)
                    .join('\n');
            } else if (answer.type == 'range') {
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
