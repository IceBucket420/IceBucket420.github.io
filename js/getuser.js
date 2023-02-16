$(document).ready(function() {
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var email = localStorage.getItem("email");

    console.log(username);
    console.log(password)
    console.log(email)

    $("#username").html(username)
    $("#pfd_user").html(username)
    $("#pfd_email").html(email)
    $("#pfd_pass").html(password)
})