/*
Complete the drawTriangle() function in index.js. The function should output a triangle with asterisks (*) based on the triangleSize parameter.

Ex: drawTriangle(4) outputs to the console a triangle with triangleSize 4, so the longest side (4 asterisks) appears on the bottom line:

*
**
***
****
*/;

// Function to draw a right-angled triangle of a given size using asterisks
function drawTriangle(triangleSize) {
   for (let i = 1; i < triangleSize + 1; i++) {
      console.log("*".repeat(i)); // Prints a line with increasing number of asterisks
   }
}

console.log("Testing drawTriangle()...");
drawTriangle(4);


// Do NOT remove the following line
export default drawTriangle;