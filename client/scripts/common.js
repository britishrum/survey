function getQuestions() {
    return Promise.resolve($.get("/questions"));
}
