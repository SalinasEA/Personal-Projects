/*
Step 1: Inspect the project
The project contains HTML, image, and JavaScript files. The index.html file displays a webpage with the heart image. The <img> tag's inline style is using absolute positioning to display the heart 50px from the browser's left edge and 50px from the browser's top edge.

When the user clicks anywhere in the page, the startAnimation() function is called. startAnimation() determines where the user clicked and calls moveImage() with the clicked (x, y) coordinate. moveImage() moves the heart 1 pixel in the direction of the given (x, y) coordinates by modifying the image's inline style.

Step 2: Add animation
Make the following JavaScript modifications using clearInterval() and setInterval() where appropriate:

In startAnimation(), add an if statement that stops the timer with the ID timerId if timerId is not null.

After the if statement in startAnimation() that stops the timer, start a timer that calls moveImage(clickX, clickY) every 10 milliseconds. Save the timer ID in the timerId variable.

Add an if statement in moveImage() that stops the timer with the ID timerId if (imgX, imgY) is equal to (centerX, centerY). Also set timerId to null.

After the modifications are complete, the user should be able to click anywhere in the browser, and the heart will move to the clicked location. If the user clicks on a new location before the heart arrives at the last location, the heart will adjust course and move to the new location.
*/

let timerId = null;  // Variable to store the ID of the timer for the image movement

// Event listener to start animation when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", function () {
   // Add event listener for any click on the document to trigger the animation
   document.addEventListener("click", startAnimation);
});

// Function that starts the image movement animation when a click occurs
function startAnimation(e) {
   // Get the mouse click coordinates relative to the viewport
   let clickX = e.clientX;
   let clickY = e.clientY;

   // If there is an ongoing animation (timerId is not null), clear the previous interval
   if (timerId !== null) {
      clearInterval(timerId);
   }

   // Set a new interval to move the image every 10 milliseconds towards the click position
   timerId = setInterval(function () { moveImage(clickX, clickY); }, 10);
}

// Function to move the image towards the clicked coordinates (x, y)
function moveImage(x, y) {
   const img = document.querySelector("img");  // Select the image element

   // Retrieve the current position of the image from the style
   let imgX = parseInt(img.style.left);  // Current x-coordinate of the image
   let imgY = parseInt(img.style.top);   // Current y-coordinate of the image

   // Calculate the target position to center the image around the clicked coordinates
   const centerX = Math.round(x - (img.width / 2));  // Center of the image horizontally
   const centerY = Math.round(y - (img.height / 2)); // Center of the image vertically

   // Check if the image has already reached the target position, stop animation if so
   if ((imgX, imgY) == (centerX, centerY)) {
      clearInterval(timerId);  // Stop the interval (animation)
      timerId = null;          // Reset the timerId
   }

   // Move the image 1 pixel toward the target position horizontally
   if (imgX < centerX) {
      imgX++;  // Move right
   }
   else if (imgX > centerX) {
      imgX--;  // Move left
   }

   // Move the image 1 pixel toward the target position vertically
   if (imgY < centerY) {
      imgY++;  // Move down
   }
   else if (imgY > centerY) {
      imgY--;  // Move up
   }

   // Update the image's position by setting the new x and y coordinates
   img.style.left = imgX + "px";
   img.style.top = imgY + "px";
}