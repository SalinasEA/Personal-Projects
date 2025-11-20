/*
Complete the isStrongPassword() function that has a single password parameter. The function should return true only if all the following conditions are true:

The password is at least 8 characters long.
The password does not contain the string "password".
The password contains at least one uppercase character.
If any of the above conditions are false, isStrongPassword() should return false.
*/

// Function to check if a password is strong based on length, content, and case sensitivity
function isStrongPassword(password) {
   // Password must be at least 8 characters long
   if (password.length < 8) {
      return false;
   }
   // Password should not contain the word "password" (case insensitive)
   if (password.toLowerCase().includes("password")) {
      return false;
   }
   // Password must contain at least one uppercase letter
   if (password == password.toLowerCase()) {
      return false;
   }
   return true; // Returns true if all conditions are met
};

console.log("Testing isStrongPassword()...");

console.log("Qwerty - " + isStrongPassword("Qwerty"));                  // false - Too short
console.log("passwordQwerty - " + isStrongPassword("passwordQwerty"));  // false - Contains "password"
console.log("qwerty123 - " + isStrongPassword("qwerty123"));            // false - No uppercase chars
console.log("Qwerty123 - " + isStrongPassword("Qwerty123"));            // true

// Do NOT remove the following line:
export default isStrongPassword;
