$(function(){
    var questionsPromise = getQuestions();
    var answersPromise = getAnswers();
    Promise.all(questionsPromise, answersPromise)
        .then(function(){
            console.log(arguments);
        });
});

function getAnswers() {
    return Promise.reslove($.get("/answers"));
}
