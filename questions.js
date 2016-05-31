module.exports = {
  getQuestions: function () {
  	return {questions: questions};
  }

};

var questions = [
{
"id" : 1,	
"type" : "multiple",
"eng" : {"question" : "How often do you need to create a bill?", "answers" : ["One time per month", "One time per week", "One time per day", "More than one time per day"]},
"rus" : {"question" : "Как часто вам надо создавать счет?", "answers" : ["Один раз в месяц", "Один раз в неделю", "Один раз в день", "Больше одного раза в день"]} 
},
{
"id" : 2,	
"type" : "free",
"eng" : {"question" : "Who is responsible for initial documentation in your company (First and Last names)?"},
"rus" : {"question" : "Кто в вашей компании занимается первичной документацией (ФИО)?"}
},
{
"id" : 3,	
"type" : "range",
"eng" : {"question" : "How are satisfied with online accounting systems for needs of your company? (1 - in any cases I would prefer offline accounting systems, 10 - in any cases I would prefer online accounting systems)"},
"rus" : {"question" : "Насколько онлайн бухгалтерия подходит специфики вашей компании? (1 - при любых обстоятельствах выберем оффлайн-решения, 10 - при любых обстоятельствах выберем онлайн-решения)"}
}
];