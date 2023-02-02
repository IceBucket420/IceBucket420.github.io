let btnSubmit = document.getElementById('submitBtn');
let msg ="Thank you for contacting us! You will receive an email in 3-4 working days.";
   

btnSubmit.addEventListener('click', function(e){

  e.preventDefault();
  document.getElementById('userdetails').innerHTML = msg;
 
});

function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}