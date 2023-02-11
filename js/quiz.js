


let btnSubmit = document.getElementById('submitBtn');

var sum=0;

function checkAns(){
    if(document.getElementByName('first_lego').value=='1949') 
       sum++;
    if(document.getElementByName('motto').value=='otbige') 
       sum++;
    if(document.getElementByName('pantent').value=='28011958') 
       sum++;
    if(document.getElementByName('web').value=='1996') 
       sum++;
    if(document.getElementByName('store').value=='sa') 
       sum++;
   };


btnSubmit.addEventListener('click', function(e){

  e.preventDefault();
  document.getElementById('results').innerHTML = `Your score is ${sum}`;
 
});
