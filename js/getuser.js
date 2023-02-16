$(document).ready(function() {
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var email = localStorage.getItem("email");

    console.log(username);
    console.log(password)
    console.log(email)

    $("#username").html(username)
    $("#pf_user").html(username)
    $("#pf_email").html(email)
    $("#pf_pass").html(password)
})