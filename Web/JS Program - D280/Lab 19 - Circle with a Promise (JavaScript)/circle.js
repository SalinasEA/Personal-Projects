/*
Step 1: Inspect the project
The project contains HTML, CSS, and JavaScript files:

index.html contains a single button for starting the circle animation.

styles.css file defines a CSS transition that animates the circle's size increase over 2 seconds.

circle.js file contains a click event handler showCircleClick() for the Show Circle button that calls showCircle() to display the orange circle. The showCircle() function returns a Promise object that may be fulfilled or rejected.

The promise is fulfilled in one second if showCircle() is not called a second time before the second elapses.
The promise is rejected if showCircle() is called a second time before the second elapses.
Step 2: Implement showCircleClick()
Modify the showCircleClick() to call showCircle() and handle the fulfilled or rejected callbacks using the returned Promise's then() method.

If the promise is fulfilled, the <div> containing the circle is passed to the callback function. The message "Ta da!" should be added to the <div>'s inner HTML.
If the promise is rejected, an error message is passed to the callback function. The error message should be displayed using alert().
If your modifications are written correctly, you should see the "Ta da!" message appear one second after the Show Circle button is clicked.
*/

// Wait for the DOM to load before attaching event listeners
window.addEventListener("DOMContentLoaded", function () {
   // Attach click event listener to the "Show Circle" button
   document.querySelector("#showCircleBtn").addEventListener("click", showCircleClick);
});

// Function to handle button click event and show circle
function showCircleClick() {
   // Call showCircle and handle the promise result
   let promise = showCircle(160, 180, 120);
   promise.then(() => {
      // Update the div with the success message once the circle shows
      let div = document.querySelector("div");
      div.innerHTML = "Ta da!";
   }, () => {
      // Alert if showCircle is called before it finishes
      alert("showCircle called too soon");
   });
}

// Do not modify the code below

let timerId = null;

// Function to create and animate the circle
function showCircle(cx, cy, radius) {
   // Only allow one div to exist at a time
   let div = document.querySelector("div");
   if (div !== null) {
      // Remove any existing circle from the DOM
      div.parentNode.removeChild(div);
   }

   // Create new div for the circle and set initial styles
   div = document.createElement("div");
   div.style.width = 0;  // Initial width
   div.style.height = 0; // Initial height
   div.style.left = cx + "px"; // Position circle at cx
   div.style.top = cy + "px";  // Position circle at cy
   div.className = "circle";   // Add the class for styling
   document.body.append(div);  // Add the circle to the DOM

   // Set width and height after a brief delay to trigger transition
   setTimeout(() => {
      div.style.width = radius * 2 + 'px';   // Set circle's width
      div.style.height = radius * 2 + 'px';  // Set circle's height
   }, 10);

   // Return a promise that resolves when the animation completes
   let promise = new Promise(function (resolve, reject) {
      // Reject if showCircle() is called before the previous animation completes
      if (timerId !== null) {
         // Clear any existing timer and remove the current circle
         clearTimeout(timerId);
         timerId = null;
         div.parentNode.removeChild(div);
         reject("showCircle called too soon");
      }
      else {
         // Set a new timer to resolve the promise after 1 second
         timerId = setTimeout(() => {
            resolve(div);  // Resolve the promise after the circle finishes
            timerId = null;
         }, 1000); // 1000ms = 1 second
      }
   });

   // Return the promise
   return promise;
}