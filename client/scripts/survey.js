var lang="rus";


function getQuestions(){
	$.get("/questions", function(data){
		console.log(data);
		//var obj = JSON.parse(data["questions"]);
		renderQuestions(data["questions"]);
	})
}

function renderQuestions(data){
	var parent = $('.questions');
	for (var i = 0; i < data.length; i++) {
		switch(data[i]['type']){
			case "multiple":

				parent.append(
					Mustache.render(multiSelectTemplate, getVM(data[i]))
					);
				break;
			case "free":
				parent.append(
					Mustache.render(freeTextTemplate, getVM(data[i]))
					);
				break;
			case "range":
				parent.append(
					Mustache.render(selectFromRangeTemplate, getVM(data[i]))
					);
				break
			default:
				break;
		}
	}
}

function getVM(question){
	var view = question[lang];
	view.id = question.id;
	view.type = question.type;
	return view;
}

function submit(){
	var answersObj= [];
	var questions = $('.question');
	for (var i = 0; i < questions.length; i++) {
		var result = getResultStub();
		var element = questions.eq(i);
		result.id = element.find('.id-hidden').val();
		result.type = element.find('.type-hidden').val();
		switch(result.type){
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
	$.post("/submit", JSON.stringify({answers: answersObj}), function () {
		//location.reload()
	})
}

function getResultStub(){
	return {answer:null, id:null, type: null};
}

function processMultiple(question){
	var answer;
	question.find('.option').each(function(i, el){
		if(el.prop("checked", true)){
			answer=el.val();
			return false;
		}
	});
	return answer;
}

$(document).ready(function() {
	$('.submit').click(submit);
});


var multiSelectTemplate = 
		"<div class='question'>\
			<input type='hidden' class='id-hidden' value='{{id}}'>\
			<input type='hidden' class='type-hidden' value='{{type}}'>\
			<p>{{question}}</p>\
			{{#answers}}\
				<label>\
					<input type='radio' class='option' name='group2' value='{{.}}'> {{.}} \
				</label></br>\
			{{/answers}}\
		</div>";

var freeTextTemplate = 
		"<div class='question'>\
			<input type='hidden' class='id-hidden' value='{{id}}'>\
			<input type='hidden' class='type-hidden' value='{{type}}'>\
			<p>{{question}}</p>\
			<textarea />\
		</div>";

var selectFromRangeTemplate = 
		"<div class='question'>\
			<input type='hidden' class='id-hidden' value='{{id}}'>\
			<input type='hidden' class='type-hidden' value='{{type}}'>\
			<p>{{question}}</p>\
				<label>\
					<input type='radio' class='option' name='group1' value='1'> 1 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='2'> 2 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='3'> 3 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='4'> 4 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='5'> 5 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='6'> 6 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='7'> 7 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='8'> 8 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='9'> 9 \
				</label></br>\
				<label>\
					<input type='radio' class='option' name='group1' value='10'> 10 \
				</label></br>\
		</div>";