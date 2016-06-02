var lang = "rus";


function getQuestions() {
    $.get("/questions", renderQuestions);
}

function renderQuestions(data) {
    if (data) {
		var parent = $('.questions');
        data.forEach(function(question) {
            var tmpl = "#" + question.type + "Template";
            parent.append(Mustache.render($(tmpl).html(), getVM(question)));
        });
    }
}

function getVM(question) {
    var view = question[lang];
    view.id = question.id;
    view.type = question.type;
    return view;
}

function submit() {
    var answersObj = [];
    var questions = $('.question');
    for (var i = 0; i < questions.length; i++) {
        var result = getResultStub();
        var element = questions.eq(i);
        result.id = parseInt(element.find('.id-hidden').val());
        result.type = element.find('.type-hidden').val();
        switch (result.type) {
            case "multiple":
                result.answer = element.find('input[name=group2]:checked.option').val();
                break;
            case "free":
                result.answer = element.find('textarea').val();
                break;
            case "range":
                result.answer = element.find('input[name=group1]:checked.option').val();
                break
            default:
                break;
        }
        answersObj.push(result);
    }
    $.post("/submit", {
        answers: answersObj
    }, function() {
        //location.reload()
    })
}

function getResultStub() {
    return {
        answer: null,
        id: 0,
        type: null
    };
}

function processMultiple(question) {
    var answer;
    question.find('.option').each(function(i, el) {
        if (el.prop("checked", true)) {
            answer = el.val();
            return false;
        }
    });
    return answer;
}

$(document).ready(function() {
    $('.submit').click(submit);
    getQuestions();
});
