
$(document).ready(function(){
    if (localStorage.getItem("username")== null){
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