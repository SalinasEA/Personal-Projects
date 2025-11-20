/*
Complete the printSum() function in index.js. The function has x and y parameters, which are assigned with strings when printSum() is called. If the strings can be converted into numbers, printSum() should output a message with the numbers' sum to the console.

Ex: printSum("3", "6") outputs the sum of 3 + 6 to the console:

Sum is 9.

If one of the arguments is not a number, then printSum() should output which argument is not a number.

Ex: printSum("hello", "6") outputs:

'hello' is not a number.

If both arguments are not numbers, printSum() should indicate so.

Ex: printSum("hello", "hi") outputs:

'hello' and 'hi' are not numbers.
*/

// Function to print the sum of two numbers, handling invalid inputs
function printSum(x, y) {
   if (isNaN(x) && isNaN(y)) {
      return console.log(`'${x}' and '${y}' are not numbers.`);
   }
   if (isNaN(x)) {
      return console.log(`'${x}' is not a number.`);
   }
   if (isNaN(y)) {
      return console.log(`'${y}' is not a number.`);
   }
   return console.log(`Sum is ${parseFloat(x) + parseFloat(y)}.`);
}


console.log("Testing printSum()...");

printSum(3, 6);            // 9
printSum(3.5, 6.1);        // 9.6
printSum("hello", 6);      // 'hello' is not a number
printSum(10, "hi");        // 'hi' is not a number
printSum("hello", "hi");   // 'hello' and 'hi' are not numbers


// Do NOT remove the following line
export default printSum;