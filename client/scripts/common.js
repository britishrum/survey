$(function() {
    $('select').val(localStorage.getItem('lang'));
});

function getQuestions() {
    var lang = localStorage.getItem('lang') || 'en';
	return Promise.resolve($.get("/questions?lang=" + lang));
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
}
