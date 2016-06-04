function getQuestions() {
    $.get("/questions", renderQuestions);
}

function renderQuestions(data) {
    if (data) {
		var parent = $('.questions');
        data.forEach(function(question) {
            var tmpl = "#" + question.type + "Template";
            parent.append(Mustache.render($(tmpl).html(), question));
        });
    }
}

function submit() {
    var answers = [];
    var questions = $('.question');
    questions.each(function(i, el){
        var result = {
            id: parseInt($(el).find('.id-hidden').val()),
            type: $(el).find('.type-hidden').val()
        };
        switch (result.type) {
            case "radio":
                result.answer = $(el).find('.option:checked').val();
                break;
            case "multiple":
                result.answer = $(el).find('.option:checked').map(function(i, el){return $(el).val();});
                break;
            case "free":
                result.answer = $(el).find('textarea').val();
                break;
            case "range":
                result.answer = $(el).find('input').val();
                break;
            default:
                break;
        }
        answers.push(result);
    });

    $.post("/submit", {
        answers: answers
    }, function() {
        //location.reload()
    })
}

$(function() {
    $('.submit').click(submit);
    getQuestions();
});
