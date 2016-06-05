function getQuestions(lang) {
    console.log(lang);
	if (lang == 'ru'){
		console.log(lang);
		return Promise.resolve($.get("/questions?lang=ru"));
	} else {
		return Promise.resolve($.get("/questions?lang=en"));
	}
}
