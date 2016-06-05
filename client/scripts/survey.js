$(function() {
    $('.submit').click(submit);
	getQuestions('ru').then(renderQuestions); //add the parameter of the language
});

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
                result.answer = $.map($(el).find('.option:checked'), function(el){return $(el).val();});
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
        result: {answers: answers}
    }, function() {
        console.log(arguments);
        //location.reload()
    })
}
