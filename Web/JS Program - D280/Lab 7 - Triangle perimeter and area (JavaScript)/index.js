/*
A triangle's three vertices can be defined with three (x, y) coordinates. Ex: The figure below shows a triangle with vertices (1, 0), (2, 4), and (4, 3).

Triangle on graph with vertices (1,0), (2, 4), and (4, 3).



Write two functions: trianglePerimeter() and triangleArea(). Both functions have six integer parameters representing the coordinates of a triangle's three vertices.

The trianglePerimeter() function should calculate the length of each side using the distance formula below. Then the function should return the sum of the three sides' length. 

d = square root of (x2 - x1) squared + (y2 - y1) squared.

Ex: The function call trianglePerimeter(1, 0, 2, 4, 4, 3) returns 10.601814290236735, the sum of the three sides' length:

Distance from (1, 0) to (2, 4) = 4.1231056256177
Distance from (2, 4) to (4, 3) = 2.2360679774998
Distance from (4, 3) to (1, 0) = 4.2426406871193
The triangleArea() function should calculate and return the triangle's area using the following equation:

 |x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)| / 2

Ex: The function call triangleArea(1, 0, 2, 4, 4, 3) returns |1(4 - 3) + 2(3 - 0) + 4(0 - 4)| / 2 = |1 + 6 + -16| / 2 = |-9| / 2 = 4.5.
*/

// Function to calculate the perimeter of a triangle given three coordinate points
function trianglePerimeter(x1, y1, x2, y2, x3, y3) {
   return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)) +
      Math.sqrt(Math.pow((x3 - x2), 2) + Math.pow((y3 - y2), 2)) +
      Math.sqrt(Math.pow((x3 - x1), 2) + Math.pow((y3 - y1), 2));
}

// Function to calculate the area of a triangle using the determinant formula
function triangleArea(x1, y1, x2, y2, x3, y3) {
   return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
}

console.log("Testing trianglePerimeter()...");
let perimeter = trianglePerimeter(1, 0, 2, 4, 4, 3);
console.log("Perimeter = " + perimeter);

console.log("Testing triangleArea()...");
let area = triangleArea(1, 0, 2, 4, 4, 3);
console.log("Area = " + area);




// Do NOT remove the following line:
export { trianglePerimeter, triangleArea };