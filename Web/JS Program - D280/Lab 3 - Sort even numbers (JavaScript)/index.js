/*
Complete the sortEvens() function, which has a single numArray parameter containing an array of integers. The function should create a new array containing only the even integers in numArray. Then the function should sort the array of even integers and return the sorted array.

Ex: The call sortEvens([4, 2, 9, 1, 8]) should return the array [2, 4, 8].

sortEvens() should return an empty array if no even numbers exist in the numArray parameter.

Ex: The call sortEvens([3, 1, 95]) should return [].
*/

// Function to sort an array in ascending order and return only the even numbers
function sortEvens(numArray) {
   // Sorts the array in ascending order
   numArray.sort(function (a, b) {
      return a - b;
   });

   let newEvenNumArray = [];
   // Filters out even numbers and stores them in a new array
   for (let i = 0; i < numArray.length; i++) {
      if (numArray[i] % 2 == 0) {
         newEvenNumArray.push(numArray[i]);
      }
   }
   return newEvenNumArray; // Returns the sorted array of even numbers
}

console.log("Testing sortEvens()...");
let nums = [4, 2, 9, 1, 8];
let evenNums = sortEvens(nums);
console.log(evenNums); // Expected output: [2, 4, 8]


// Do NOT remove the following line:
export default sortEvens;