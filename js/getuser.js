$(document).ready(function() {
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var email = localStorage.getItem("email");
    var address = localStorage.getItem("address")

    console.log(username);
    console.log(password)
    console.log(email)
    console.log(address)

    $("#username").html(username)
    $("#pf_user").html(username)
    $("#pf_email").html(email)
    $("#pf_pass").html(password)
    $("#input_address").html(address)

})