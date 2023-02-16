function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

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
    let userAddress = $("#user-address").val();
    let userPoints = 100;

    console.log(userName);
    console.log(userEmail);
    console.log(userPassword);
    console.log(userAddress);
    console.log(userPoints);

    let jsondata = {
      "email": userEmail,
      "password": userPassword,
      "username": userName,
      "address": userAddress,
      "points": userPoints
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
          localStorage.setItem("address", response[i].address);
          localStorage.setItem("points", response[i].points);
          localStorage.setItem("id", response[i]._id );

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

  //reward points

  $("#claimall").on("click", function(e) {
    e.preventDefault();

    var id = localStorage.getItem("id");
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    let email = localStorage.getItem("email");
    let address = localStorage.getItem("address");
    var points = localStorage.getItem("points");

    /*console.log(id);
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(address);*/

    combine_points = parseInt($("#reward_1").text()) + parseInt($("#reward_2").text()) + parseInt($("#reward_3").text()) + parseInt($("#reward_4").text())

    let new_points = parseInt(points) + parseInt(combine_points)
    console.log(new_points)
    localStorage.setItem("points", new_points);

    updatePoints(id, username, password, email, address, new_points);

  });
  $("#claim_1").on("click", function(e) {
    e.preventDefault();

    var id = localStorage.getItem("id");
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    let email = localStorage.getItem("email");
    let address = localStorage.getItem("address");
    var points = localStorage.getItem("points");

    /*console.log(id);
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(address);*/

    let new_points = parseInt(points) + parseInt($("#reward_1").text())
    console.log(new_points)
    localStorage.setItem("points", new_points);

    updatePoints(id, username, password, email, address, new_points);

  });

  $("#claim_2").on("click", function(e) {
    e.preventDefault();

    var id = localStorage.getItem("id");
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    let email = localStorage.getItem("email");
    let address = localStorage.getItem("address");
    var points = localStorage.getItem("points");

    let new_points = parseInt(points) + parseInt($("#reward_2").text())
    console.log(new_points)
    localStorage.setItem("points", new_points);

    updatePoints(id, username, password, email, address, new_points);

  });

  $("#claim_3").on("click", function(e) {
    e.preventDefault();

    var id = localStorage.getItem("id");
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    let email = localStorage.getItem("email");
    let address = localStorage.getItem("address");
    var points = localStorage.getItem("points");

    let new_points = parseInt(points) + parseInt($("#reward_3").text())
    console.log(new_points)
    localStorage.setItem("points", new_points);

    updatePoints(id, username, password, email, address, new_points);

  });

  $("#claim_4").on("click", function(e) {
    e.preventDefault();

    var id = localStorage.getItem("id");
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    let email = localStorage.getItem("email");
    let address = localStorage.getItem("address");
    var points = localStorage.getItem("points");

    let new_points = parseInt(points) + parseInt($("#reward_4").text())
    console.log(new_points)
    localStorage.setItem("points", new_points);

    updatePoints(id, username, password, email, address, new_points);

  });

  function updatePoints(id, username, password, email, address, new_points) {

    console.log(new_points);

    var jsondata = {
      "email": email,
      "password": password,
      "username": username,
      "address": address,
      "points": new_points
    }

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://legoholic-fb03.restdb.io/rest/sign-in/${id}`,
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function(response) {
      console.log(response);
    });

  }

  //[STEP] 6
  //let's create a function to allow you to retrieve all the information in your contacts
  //by default we only retrieve 10 results

  function getCart( limit = 10, all = true) {
    //[STEP 7]: Create our AJAX settings

    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var email = localStorage.getItem("email");

    console.log(username);
    console.log(password);
    console.log(email);

    $("#show-username").html(username)
    $("#show-password").html(password)
    $("#show-username").html(username)

    //$("#product-image").attr('src', 'images/hpdragon.jpg')

    let userPassword = password;
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

      for (var i = 0; i < response.length && i < limit; i++) {

        if (response[i].password == userPassword) {

          content = `${content}<tr><tr><td rowspan="3"><img class="cart_image" src="${response[i].image}"></td><td id="cart-name">${response[i].name}</td><td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td></tr><tr><td>${response[i].price}</td><td><a href='#update-cart-container' class='update' data-id='${response[i]._id}' data-name='${response[i].name}'>Update</a></td></tr><tr><td id="cart-quantity">${response[i].quantity}</td></tr></tr>`

          var item_price = 0;

          for (var a = 0; a < response.length;) {
            item_price = item_price + response[a].price
            a += 1;
            //console.log(total_price)

            localStorage.setItem("total_price", item_price)
          }
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

  $("#cart-list").on("click", ".update", function(e) {
    e.preventDefault();

    let productId = $(this).data("id");

    console.log(productId)
    $("#update-cart-container").show();

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
      console.log(response)

      for (var i = 0; i < response.length; i++) {
        if (response[i]._id == productId) {
          console.log(response[i]._id);
          console.log(response[i].password);
          console.log(response[i].name);
          console.log(response[i].price);
          console.log(response[i].quantity);
          console.log(response[i].image);


          ori_price = parseInt(response[i].price) / parseInt(response[i].quantity)

          console.log(ori_price)

          localStorage.setItem("product_id", response[i]._id)
          localStorage.setItem("product_name", response[i].name);
          localStorage.setItem("product_price", ori_price);
          localStorage.setItem("product_image", response[i].image);
        }
      }

    });
    

  });

  $("#update-cart-submit").on("click", function(e) {

    e.preventDefault();
    let productId = localStorage.getItem("product_id");
    let productPassword = localStorage.getItem("password");
    let productName = localStorage.getItem("product_name");
    let productImage = localStorage.getItem("product_image");

    let price = localStorage.getItem("product_price");

    let updateprice = parseInt(price) * parseInt(value);

    let productQuantity = parseInt(value);
    let productPrice = updateprice;

    console.log(productId);
    console.log(productPassword);
    console.log(productName);
    console.log(productPrice);
    console.log(productQuantity);
    console.log(productImage);

    updateForm(productId, productPassword, productName, productPrice, productQuantity, productImage);

  });

  /*$("#cart-list").on("click", ".update", function(e) {
    e.preventDefault();
    //update our update form values
    let productId = $(this).data("id");

    let productName = $(this).data("name");
    let productPrice = $(this).data("price");
  
    console.log($(this).data("quantity"));
  
    //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
    $("#update-product-name").val(productName);
    $("#update-product-id").val(productId);
    $("#update-product-price").val(productPrice);
    $("#update-product-id").val(productId)
    $("#update-cart-container").show();

    console.log(productId)

  });//end contact-list listener for update function

  //[STEP 12]: Here we load in our contact form data
  //Update form listener
  $("#update-cart-submit").on("click", function(e) {
    e.preventDefault();
    //retrieve all my update form values

    let updateprice = parseInt($("#product-price").text()) * parseInt(value);

    console.log(value)
    console.log(parseInt($("#product-price").text()))
    console.log(updateprice)
    let productPassword = $("#show-password").text();
    let productName = $("#cart-name").text();
    let productId = $("#update-product-id").val();
    let productPrice = parseInt(updateprice);
    let productQuantity = parseInt(value);
    let productImage = $("#cart_image").attr('src')

    //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
    updateForm(productId, productPassword, productName, productPrice, productQuantity, productImage);
  });//end updatecontactform listener */

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
  function updateForm(id, productPassword, productName, productPrice, productQuantity, productImage) {
    //@TODO create validation methods for id etc. 

    var jsondata = { "password": productPassword, "name": productName, "price": productPrice, "quantity": productQuantity, "image": productImage};
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

    var jsondata = { 
      "password": deletePassword, 
      "name": deleteName, 
      "price": deletePrice, 
      "quantity": deleteQuantity, 
      "image": deleteImage 
    };
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