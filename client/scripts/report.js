$(function(){
    var questionsPromise = getQuestions();
    var answersPromise = getAnswers();
    Promise.all([questionsPromise, answersPromise])
        .then(function(res){
            var questionsRes = res[0];
            var answersRes = res[1];
            answersRes.forEach(function(answerEntry) {
                answerEntry.answers.forEach(function(answer) {
                    if (answer.type == 'free') {
                        answer.text = answer.answer;
                    } else if (answer.type == 'multiple') {

                    } else if (answer.type == 'range') {

                    } else if (answer.type == 'radio') {
                        
                    }
                });
            });
        });
});

function getAnswers() {
    return Promise.resolve($.get("/answers"));
}
