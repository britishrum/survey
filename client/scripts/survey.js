$(function() {
    $('.submit').click(submit);
	getQuestions().then(renderQuestions); //add the parameter of the language
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
            id: $(el).find('.id-hidden').val(),
            type: $(el).find('.type-hidden').val(),
        };
        result.answer = getAnswer(result.type, el);
        answers.push(result);
    });

    var notAnswered = answers.filter(answerEntry => {
        var answered = answerEntry.answer.length
        var bgColor = answered ? "white" : "pink";
        $("#question" + answerEntry.id).css("background-color", bgColor);
        return !answered;
    });
    if (!notAnswered.length) {
        $.post("/submit", {
            result: {answers: answers}
        }, function() {
            console.log(arguments);
            location.reload()
        });
    }
}

function getAnswer(type, el) {
    if (type == "radio") {
        return $(el).find('.option:checked').val();
    } else if (type == "multiple") {
        return $.map($(el).find('.option:checked'), el => $(el).val());
    } else if (type == "free") {
        return $(el).find('textarea').val();
    } else if (type == "range") {
        return $(el).find('input').val();
    }
}
