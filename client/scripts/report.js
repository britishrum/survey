const colors = [
    "#4DFFEE",
    "#7DE84A",
    "#FFD870",
    "#E8514F",
    "#975AFF",
    "#67ABFF",
    "#54E87F",
    "#FFEC71",
    "#E8784F",
    "#D863FF"
];

$(function() {
    var questionsPromise = getQuestions();
    var answersPromise = getAnswers();
    Promise.all([questionsPromise, answersPromise])
        .then(function(res) {
            var questions = res[0];
            var answersRes = res[1];
            var answers = prepareAnswers(questions, answersRes);
            var parent = $('#answersDiv');

            var rangeQuestions = prepareRangeQuestions(questions, answers);
            var avgTmpl = $("#avgTemplate").html();
            parent.append(Mustache.render(avgTmpl, {
                rangeQuestions: rangeQuestions,
            }));

            var pieData = preparePieData(questions, answers);
            pieData.forEach(data => {
                var chartTmpl = $("#chartTemplate").html();
                parent.append(Mustache.render(chartTmpl, data));
                var ctx = document.getElementById("chart" + data.id).getContext("2d");
                var chart = new Chart(ctx, {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            });


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

function prepareRangeQuestions(questions, answers) {
    var res = questions.filter(q => q.type == 'range');
    res.forEach(q => {
        var rangeAnswers = answers.map(a => {
            var questionAnswer = a.answers.filter(a => a.id == q.id)[0];
            return questionAnswer && questionAnswer.answer;
        });
        var avg = rangeAnswers.reduce((prev, next) => prev + next, 0) / rangeAnswers.length;
        q.avg = Math.round(avg * 100) / 100;
    });
    return res;
}

function preparePieData(questions, answerEntries) {
    var res = questions.filter(q => q.type == 'multiple');
    res.forEach(q => {
        q.labels = q.answers.map(a => a.text);
        q.datasets = [];
        var dataset = {};
        var distribution = answerEntries.map(answerEntry =>
            answerEntry.answers.filter(a => a.id == q.id)[0]
        ).reduce((prev, next) => {
            next.answer.forEach(nextAnswer => {
                prev[nextAnswer] = prev[nextAnswer] || 0;
                prev[nextAnswer]++;
            });
            return prev;
        }, {});
        dataset.data = q.answers.map(a => distribution[a.id] || 0);
        dataset.backgroundColor = colors.slice(0, q.answers.length);
        dataset.hoverBackgroundColor = dataset.backgroundColor;
        q.datasets.push(dataset);
    });
    return res;
};

function getAnswers() {
    return Promise.resolve($.get("/answers"));
}
