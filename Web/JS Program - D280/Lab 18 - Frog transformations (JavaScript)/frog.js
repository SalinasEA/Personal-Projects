/*
Step 1: Inspect the project
The project contains HTML, image, and JavaScript files. The index.html file contains a 600 x 600 canvas. An <img> element uses inline CSS to hide the frog.png image.

The frog.js file contains two functions:

The load event handler calls drawFrog() four times with different canvas coordinates and directions.

drawFrog() is only partially implemented and currently displays a frog facing up on the canvas at the given (x, y) coordinate.

Step 2: Implement drawFrog()
Complete the drawFrog() function to draw the frog facing down, left, or right, depending on the direction parameter. Use the canvas context methods translate(), rotate(), and drawImage() to perform the following:

Translate the canvas origin from (0, 0) to the center of the frog image, which is (x + frogImg.width / 2, y + frogImg.height / 2)
Rotate 90 degrees clockwise to draw the frog facing right, 90 degrees counterclockwise to face left, and 180 degrees to face down
Translate the origin back to (0, 0)
Draw the frog image
*/

// Define directions for frog movement
const directions = {
   UP: 'up',
   DOWN: 'down',
   LEFT: 'left',
   RIGHT: 'right'
}

// Wait for the page to fully load
window.addEventListener("load", function () {
   const canvas = document.querySelector("canvas");

   // Draw 4 frogs facing different directions
   drawFrog(canvas, 50, 50, directions.UP);     // Draw frog facing up
   drawFrog(canvas, 180, 50, directions.DOWN);   // Draw frog facing down
   drawFrog(canvas, 50, 180, directions.LEFT);   // Draw frog facing left
   drawFrog(canvas, 180, 180, directions.RIGHT); // Draw frog facing right
});

// Function to draw a frog at a specific position and direction
function drawFrog(canvas, x, y, direction = directions.UP) {
   const context = canvas.getContext("2d");
   const frogImg = document.querySelector("img");

   // Rotate the canvas based on frog's direction
   switch (direction) {
      case directions.DOWN:
         // Rotate 180 degrees for downward direction
         context.translate(x + frogImg.width / 2, y + frogImg.height / 2); // Move the origin to the frog's center
         context.rotate(180 * Math.PI / 180);  // Rotate 180 degrees
         context.translate(-x - frogImg.width / 2, -y - frogImg.height / 2) // Move origin back
         break;
      case directions.LEFT:
         // Rotate -90 degrees for left direction
         context.translate(x + frogImg.width / 2, y + frogImg.height / 2); // Move the origin to the frog's center
         context.rotate(-90 * Math.PI / 180);  // Rotate -90 degrees
         context.translate(-x - frogImg.width / 2, -y - frogImg.height / 2) // Move origin back
         break;
      case directions.RIGHT:
         // Rotate 90 degrees for right direction
         context.translate(x + frogImg.width / 2, y + frogImg.height / 2); // Move the origin to the frog's center
         context.rotate(90 * Math.PI / 180);   // Rotate 90 degrees
         context.translate(-x - frogImg.width / 2, -y - frogImg.height / 2) // Move origin back
         break;
   }

   // Draw the frog image at the given position
   context.drawImage(frogImg, x, y);

   // Reset the canvas transformations so the next draw isn't affected
   context.resetTransform();
}
