/*==================== FORM EMAIL - CONFIRM EMAIL VALIDATION ====================*/
function checkFormEmail(event) {
    let email = document.querySelector("#emailAddress").value;
    let confirmEmail = document.querySelector("#confirmationEmail").value;
    if (email !== confirmEmail) {
        event.preventDefault();
        alert("Email addresses do not match. Please try again.");
    }
    else {
        alert("Email addresses match!");
    }
}

let validateFormEmail = document.querySelector("#userInfoForm");
validateFormEmail.addEventListener("submit", checkFormEmail);