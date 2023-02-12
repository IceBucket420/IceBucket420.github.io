var loggedIn = false

function checklogin(){
    if(localStorage.getItem("username")!= null){
        loggedIn == true;
    }
};

$(document).ready(function(){
if (localStorage.getItem("KEY")!= null){
    $("#carticon").show();
    $("profileicon").show();
    $("signinicon").hide();
}
else {
    $("#carticon").hide();
    $("#profileicon").hide();
    $("#signinicon").show();
}
});

$(document).ready(function(){
    if (localStorage.getItem("KEY")== null){
      $("#carticon").hide();
      $("#profileicon").hide();
      $("#signinicon").show();
    }
    else {
        $("#carticon").show();
        $("profileicon").show();
        $("signinicon").hide();
    }
    });