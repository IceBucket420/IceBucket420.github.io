
var numQues = 5;

var numChoi = 4;

function getScore(form) {
  var score = 0;
  var currElt;
  var currSelection;
  for (i=0; i<numQues; i++) {
    currElt = i*numChoi;
    for (j=0; j<numChoi; j++) {
      currSelection = form.elements[currElt + j];
      if (currSelection.checked) {
        if (currSelection.value == answers[i]) {
          score++;
		break;
        }
      }
    }
  }
  score = Math.round(score/numQues*100);
  form.percentage.value = score + "%";
  var correctAnswers = "";
  for (i=1; i<=numQues; i++) {
    correctAnswers += i + ". " + answers[i-1] + "\r\n";
  }
  
  form.solutions.value = correctAnswers;
}

document.addEventListener('DOMContentLoaded', function() {
	var q1Inputs = document.querySelector('.q1-inputs');
	q1Inputs.addEventListener('change', function(event) {
		if (event.target.value !== 'Keep to the left side of the road far as is safe.') {
			q1Inputs.lastElementChild.classList.remove('hidden');
		} else {
			q1Inputs.lastElementChild.classList.add('hidden');
		}
	});
});