
$(document).ready(function(){

  setTimeout(function(){
    $(".form-div form a").click(function(e){
      e.preventDefault();
      $("#myModal").css("display", "block");
      $("body").css("overflow", "hidden");
    });
  }, 1000);




  // Close the modal when the close button is clicked
  $(".close").on("click", function() {
    $("#myModal").css("display", "none");
    $("body").css("overflow", "visible");
  });

  // Close the modal when clicking outside of it
  $(window).on("click", function(event) {
    if (event.target == document.getElementById("myModal")) {
      $("#myModal").css("display", "none");
    }
  });

});

const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submit-btn');
const thankYouMsg = document.getElementById('thankYouContainer');

form.addEventListener("submit" , function(event) {
  event.preventDefault();

  //send value exp start
  const resEmpName = document.getElementById('resmed-employee-name');
  let resEmpNameValue = resEmpName.value;

  const resEmpEmail = document.getElementById('resmed-employee-email');
  let resEmpEmailValue = resEmpEmail.value;

  const refName = document.getElementById('referral-contact-name');
  let refNameValue = refName.value;

  const refPhone = document.getElementById('referral-contact-number');
  let refPhoneValue = refPhone.value;

  const emailField = document.getElementById('referral-contact-email');
  let emailValue = emailField.value.trim();
  

  const emailInput = form.elements["referral-contact-email"];
  const emailError = document.getElementById("emailError");
  //const emailRegex = /\S+@\S+\.\S+/;
  const nameInput = form.elements["referral-contact-name"];
  const nameError = document.getElementById("nameError");
  const phoneInput = form.elements["referral-contact-number"];
  const chkbxError = document.getElementById("chkbxError");
  const phoneError = document.getElementById("phoneError");
  nameError.textContent = "";
  phoneError.textContent = "";
  emailError.textContent = "";
  if (nameInput.value === "") {
    console.log(nameInput.value)
    nameError.textContent = "Please complete this required field.";
  }
  if (phoneInput.value === "") {
    phoneError.textContent = "Please complete this required field.";
  }
  if (phoneInput.value === "") {
    phoneError.textContent = "Please complete this required field.";
  }
  const checkbox = document.getElementById("terms-and-conditions");
  if (!checkbox.checked) {
    chkbxError.textContent = "Please complete this required field.";
  }
  else{
    chkbxError.textContent = "";
  }
  
  if(!validateEmail(emailValue)){
 emailError.textContent = "Email must be formatted correctly.";
}
else{
  emailError.textContent = "";
}
    
      
  if (refNameValue !== "" && refPhoneValue !== "" && checkbox.checked && validateEmail(emailValue)==true ) {
    form.style.display = 'none'; 
    thankYouMsg.style.display = 'block'; 
    formv3(resEmpNameValue, resEmpEmailValue, refNameValue, refPhoneValue, emailValue, checkbox.checked );
  }

});

function formv3(resEmpNameValue1, resEmpEmailValue1, refNameValue1, refPhoneValue1, emailValue1, checkbox1) {
  console.log(emailValue1, "FROM FUNC V3");
  var currentURL = window.location.href;
  var currentPageTitle = $(document).find("title").text();
  let finalmail;
  if (emailValue1 === '') {
    finalmail = refPhoneValue1 + "@gmail.com";
  } else finalmail = emailValue1;
  console.log({finalmail});
  // Create the new request
  var xhr = new XMLHttpRequest();
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/3445757/4e44bd73-72a2-4fa7-91dd-b13e87c1a48a'

  // Example request JSON:
  var data = {
    "fields": [
      {
        "name": "firstname",
        "value": resEmpNameValue1
      },
      {
        "name": "resmed_employee_email",
        "value": resEmpEmailValue1
      },
      {
        "name": "customer_name",
        "value": refNameValue1
      },
      {
        "name": "mobilephone",
        "value": refPhoneValue1
      },
      {
        "name": "email",
        "value": finalmail
      },
      {
        "name": "terms_and_condition",
        "value": checkbox1
      }
    ],
    "context": {
      "hutk": document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
      "pageUri": currentURL,
      "pageName": currentPageTitle
    },
    "legalConsentOptions":{ 
      "consent":{
        "consentToProcess":true,
        "text":"I agree to allow Example Company to store and process my personal data.",
        "communications":[
          {
            "value":true,
            "subscriptionTypeId":999,
            "text":"RESMED"
          }
        ]
      }
    }
  }

  var final_data = JSON.stringify(data)

  xhr.open('POST', url);
  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
    } else if (xhr.readyState == 4 && xhr.status == 400){
      console.log(xhr.responseText); // Returns a 400 error the submission is rejected.          
    } else if (xhr.readyState == 4 && xhr.status == 403){
      console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.          
    } else if (xhr.readyState == 4 && xhr.status == 404){
      console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found    
    }
    console.log(xhr.responseText)
  }

  // Sends the request
  console.log(final_data);
  xhr.send(final_data)
}


// email validation
function validateEmail(email) {
  // Regular expression pattern to validate email format (with optional email address)
  const pattern = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Test the email against the pattern and return the result
  return pattern.test(email);
}

// Example usage
const email1 = "example@example.com";
const isValidEmail1 = validateEmail(email1);
console.log(isValidEmail1); // true

const email2 = "";
const isValidEmail2 = validateEmail(email2);
console.log(isValidEmail2); // true





