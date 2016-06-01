function lol() {
	console.log("function lol");
}

function renderMultiSelect(parent, json){
	parent.append(
		"<div>\
			<input type='radio' name='group'>1\
			<input type='radio' name='group'>2\
			<input type='radio' name='group'>3\
			<input type='radio' name='group'>4\
			<input type='radio' name='group'>5\
			<input type='radio' name='group'>6\
			<input type='radio' name='group'>7\
			<input type='radio' name='group'>8\
			<input type='radio' name='group'>9\
			<input type='radio' name='group'>10\
		</div>");
}

function renderSelectFromRange(parent) {
	parent.append(
		"<div>\
			<input type='radio' name='group'>1\
			<input type='radio' name='group'>2\
			<input type='radio' name='group'>3\
			<input type='radio' name='group'>4\
			<input type='radio' name='group'>5\
			<input type='radio' name='group'>6\
			<input type='radio' name='group'>7\
			<input type='radio' name='group'>8\
			<input type='radio' name='group'>9\
			<input type='radio' name='group'>10\
		</div>");
}

function renderFreeText(argument) {
	// body...
}