//[STEP 0]: Make sure our document is A-OK

$(document).ready(function() {

  //what kind of interface we want at the start 
  const APIKEY = "63e0bbb93bc6b255ed0c46e8";
  getCart();
  $("#update-cart-container").hide();
  $("#add-update-msg").hide();
  $("#add-newuser-msg").hide();
  $("#add-signin-fail").hide();
  $("#logout_msg").hide();

  $("#user-signup").on("click", function(e) {
    e.preventDefault();

    let userName = $("#user-name").val();
    let userEmail = $("#user-email").val();
    let userPassword = $("#user-password").val();

    console.log(userName);
    console.log(userEmail);
    console.log(userPassword);

    let jsondata = {
      "email": userEmail,
      "password": userPassword,
      "username": userName
    };

    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://legoholic-fb03.restdb.io/rest/sign-in",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata),
      "beforeSend": function() {
        //@TODO use loading bar instead
        //disable our button or show loading bar
        $("#user-signup").prop("disabled", true);
        //clear our form using the form id and triggering it's reset feature
        $("#add-signup-form").trigger("reset");
      }
    }

    $.ajax(settings).done(function(response) {
      console.log(response);

      $("#user-signup").prop("disabled", false);
      $("#add-newuser-msg").show().fadeOut(3000);

      /*$("#show-username").html(userName);
      $("#show-password").html(userPassword);
      $("#show-email").html(userEmail);*/

    }); 

  });

  $("#check-user").on("click", function(e) {

    e.preventDefault();


    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://legoholic-fb03.restdb.io/rest/sign-in",
      "method": "GET", //[cher] we will use GET to retrieve info
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "beforeSend": function() {
        //@TODO use loading bar instead
        //disable our button or show loading bar
        $("#check-user").prop("disabled", true);
        //clear our form using the form id and triggering it's reset feature
        $("#check-signin-form").trigger("reset");
      }
    }

    let userName = $("#check-username").val();
    let userPassword = $("#check-password").val();

    $.ajax(settings).done(function(response) {

      //let content = "";
      console.log(response)

      limit = 10;

      //console.log(userName);
      //console.log(userPassword);

      for (var i = 0; i < response.length && i < limit; i++) {
        if (response[i].username == userName && response[i].password == userPassword) {

          localStorage.setItem("username", userName);
          localStorage.setItem("password", userPassword);
          localStorage.setItem("email", response[i].email);

          getCart(userPassword);

          location.href="index.html";

        }
        else if (response[i].username != userName && response[i].password != userPassword) {
          console.log("User does not exist.")
          $("#add-signin-fail").show().fadeOut(3000);
        }
      }
      $("#check-user").prop("disabled", false);
    }); 

  }); 


  //[STEP 1]: Create our submit form listener
  $("#product-submit").on("click", function(e) {
    //prevent default action of the button 
    e.preventDefault();

    let finalprice = parseInt($("#product-price").text()) * parseInt(value);

    //[STEP 2]: let's retrieve form data
    //for now we assume all information is valid
    //you are to do your own data validation
    let userPassword = $("#show-password").text();
    let productName = $("#product-name").text();
    let productPrice = parseInt(finalprice);
    let productQuantity = parseInt(value);
    let productImage = $("#product-image").attr('src');


    //[STEP 3]: get form values when user clicks on send
    //Adapted from restdb api
    let jsondata = {
      "password": userPassword,
      "name": productName,
      "price": productPrice,
      "quantity": productQuantity,
      "image": productImage
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://legoholic-fb03.restdb.io/rest/cart",
      "method": "POST", //[cher] we will use post to send info
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata),
      "beforeSend": function() {
        //@TODO use loading bar instead
        //disable our button or show loading bar
        $("#product-submit").prop("disabled", true);
        //clear our form using the form id and triggering it's reset feature
        $("#add-product-form").trigger("reset");
      }
    }

    //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
    $.ajax(settings).done(function(response) {
      console.log(response);

      $("#product-submit").prop("disabled", false);

      //@TODO update frontend UI 
      $("#add-update-msg").show().fadeOut(3000);

      //update our table 

      getCart();

      location.href="cart.html";
    });
  });//end click 


  //[STEP] 6
  //let's create a function to allow you to retrieve all the information in your contacts
  //by default we only retrieve 10 results

  function getCart( limit = 10, all = true) {
    //[STEP 7]: Create our AJAX settings

    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var email = localStorage.getItem("email");

    console.log(username);
    console.log(password)
    console.log(email)

    $("#show-username").html(username)
    $("#show-password").html(password)
    $("#show-username").html(username)

    let userPassword = password;
    //console.log($("#show-password").text())

    //let userPassword = $("#show-password").text();

    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://legoholic-fb03.restdb.io/rest/cart",
      "method": "GET", //[cher] we will use GET to retrieve info
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
    }

    $.ajax(settings).done(function(response) {

      let content = "";

      let form = "";

      for (var i = 0; i < response.length && i < limit; i++) {

        if (response[i].password == userPassword) {
          console.log(response)

          console.log(response[i].name)
          console.log(response[i].price)
          console.log(response[i].quantity)

          content = `${content}<tr id='${response[i]._id}'><td>${response[i].password}</td><td>${response[i].name}
        </td><td>${response[i].price}</td><td>${response[i].quantity}</td><td>${response[i].image}</td><td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-cart-container' class='update' data-id='${response[i]._id}' data-name='${response[i].name}'>Update</a></td></tr>`;
        }
        else {
          console.log("No")
        }
      }

      /*for (var i = 0; i < response.length && i < limit; i++) {
       content = `${content}<tr id='${response[i]._id}'><td>${response[i].username}</td><td>${response[i].name}
       </td><td>${response[i].price}</td><td>${response[i].quantity}</td><td>${response[i].image}</td><td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-cart-container' class='update' data-id='${response[i]._id}' data-name='${response[i].name}'>Update</a></td></tr>`;
  
     }*/


      $("#cart-list tbody").html(content);

      $("#total-cart").html(response.length);
    });

  }

  //[STEP 10]: Create our update listener
  //here we tap onto our previous table when we click on update
  //this is a delegation feature of jquery
  //because our content is dynamic in nature, we listen in on the main container which is "#contact-list". For each row we have a class .update to help us
  $("#cart-list").on("click", ".update", function(e) {
    e.preventDefault();
    //update our update form values
    let productId = $(this).data("id");

    /*let productName = $(this).data("name");
    let productPrice = $(this).data("price");
    let productId = $(this).data("id");
  
    console.log($(this).data("quantity"));
  
    //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
    $("#update-product-name").val(productName);
    $("#update-product-id").val(productId);
    $("#update-product-price").val(productPrice);*/
    $("#update-product-id").val(productId)
    $("#update-cart-container").show();

  });//end contact-list listener for update function

  //[STEP 12]: Here we load in our contact form data
  //Update form listener
  $("#update-cart-submit").on("click", function(e) {
    e.preventDefault();
    //retrieve all my update form values

    let updateprice = parseInt($("#product-price").text()) * parseInt(value);

    console.log(updateprice)

    let productName = $("#product-name").text();
    let productId = $("#update-product-id").val();
    let productPrice = parseInt(updateprice);
    let productQuantity = parseInt(value);

    //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
    updateForm(productId, productName, productPrice, productQuantity);
  });//end updatecontactform listener

  //delete
  $("#cart-list").on("click", ".delete", function(e) {
    e.preventDefault();

    let deletePassword = $(this).data("password")
    let deleteName = $(this).data("name");
    let deletePrice = $(this).data("price");
    let deleteId = $(this).data("id");
    let deleteQuantity = $(this).data("quantity");
    let deleteImage = $(this).data("image");

    console.log($(this).data("password"));
    console.log($(this).data("name"));
    console.log($(this).data("price"));
    console.log($(this).data("id"));
    console.log($(this).data("quantity"));
    console.log($(this).data("image"));

    deleteForm(deleteId, deletePassword, deleteName, deletePrice, deleteQuantity, deleteImage);
  });


  //[STEP 13]: function that makes an AJAX call and process it 
  //UPDATE Based on the ID chosen
  function updateForm(id, productName, productPrice, productQuantity) {
    //@TODO create validation methods for id etc. 

    var jsondata = { "name": productName, "price": productPrice, "quantity": productQuantity };
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://legoholic-fb03.restdb.io/rest/cart/${id}`,//update based on the ID
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }

    //[STEP 13a]: send our AJAX request and hide the update contact form
    $.ajax(settings).done(function(response) {
      console.log(response);

      $("#update-cart-container").fadeOut(5000);
      //update our contacts table
      getCart();
    });
  }//end updateform function

  function deleteForm(id, deletePassword, deleteName, deletePrice, deleteQuantity, deleteImage) {

    var jsondata = { "password": deletePassword, "name": deleteName, "price": deletePrice, "quantity": deleteQuantity, "image": deleteImage };
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://legoholic-fb03.restdb.io/rest/cart/${id}`,//update based on the ID
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }

    //[STEP 13a]: send our AJAX request and hide the update contact form
    $.ajax(settings).done(function(response) {
      console.log(response);
      getCart();
    });
  }

  //logout
  $("#logout_button").on("click", function(e) {
    localStorage.removeItem("KEY");
    localStorage.clear();

    $("#logout_button").hide();
    $("#logout_msg").show();
  });

})