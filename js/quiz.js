var allQuestions = [{
   question: "When was the first Lego brick produced?",
   choices: ["1950", "1949", "1948","1947"],
   correctAnswer: 1
 },

 {
   question: "Does What is the Lego Group's motto?",
   choices: ["The Toys That Are New Every Day", "Make Your World Possible", "Only The Best Is Good Enough","The Toys You Grow Up With"],
   correctAnswer: 2
 },

 {
   question: "When was the patent filed for the Lego brick design?",
   choices: ["27th, January 1958", "28th, January 1949", "30th, January 1957", "28th, January 1958"],
   correctAnswer: 3
 },

 {
   question: " When was the Lego website launched? ",
   choices: ["1997", "1996", "1998", "1995"],
   correctAnswer: 1
 },

 {
   question: "Where was the first Lego store to be opened?",
   choices: ["Sydney, Australia", "Billund, Denmark", "Melbourne, Australia","Perth, Australia"],
   correctAnswer: 0
 }
];

var currentquestion = 0;
var correctAnswers = 0;
var pointsEarn= 0;

function setupOptions() {
 $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
 var options = allQuestions[currentquestion].choices;
 var formHtml = '';
 for (var i = 0; i < options.length; i++) {
   formHtml += '<div><input type="radio" name="option" value="' + i + '" id="option' + i + '"><label for="option' + i + '">' +
     allQuestions[currentquestion].choices[i] + '</label></div><br/>';
 }
 $('#form').html(formHtml);
 $("#option0").prop('checked', true);
};

function checkAns() {
 if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
   correctAnswers++;
   pointsEarn += 5;
 };
};

$(document).ready(function() {

 $(".jumbotron").hide();
 $('#start').click(function() {
   $(".jumbotron").fadeIn();
   $(this).hide();
 });

 
 setupOptions();

 $("#next").click(function() {
   event.preventDefault();
   checkAns();
   currentquestion++;
   $(function() {
     $("#progressbar").progressbar({
       value: currentquestion
     });
   });
   if (currentquestion < allQuestions.length) {
     setupOptions();
     if (currentquestion == allQuestions.length - 1) {
       $('#next').html("Submit");
       $('#next').click(function() {
         $(".jumbotron").hide();
         $("#result").html("You correctly answered " + correctAnswers + " out of " + currentquestion + " questions! ").hide();
         $("#pointsearn").html("You earned " +pointsEarn+" points!").hide();
         $("#result").fadeIn(1500);
         $("#pointsearn").fadeIn(1500);
       });

     };

   };
 });
});