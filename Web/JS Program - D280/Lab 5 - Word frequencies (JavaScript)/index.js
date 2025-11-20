/*
Write the function calcWordFrequencies() that has a single words parameter. calcWordFrequencies() is called with a string argument containing a list of words separated by spaces. The function should output those words and their frequencies to the console.

Ex: If the function call is:

calcWordFrequencies("hey hi Mark hi mark");

then the console output is:

hey 1
hi 2
Mark 1
mark 1
*/

// Function to calculate word frequencies in a given string
function calcWordFrequencies(words) {
   let splitArray = words.split(" "); // Split the string into an array of words
   let wordsMap = new Map(); // Map to store word counts

   // Loop through each word and update frequency count
   for (let i = 0; i < splitArray.length; i++) {
      if (wordsMap.has(splitArray[i])) {
         wordsMap.set(splitArray[i], wordsMap.get(splitArray[i]) + 1);
      } else {
         wordsMap.set(splitArray[i], 1);
      }
   }

   // Print each word with its frequency
   for (let [word, frequency] of wordsMap) {
      console.log(`${word} ${frequency}`);
   }
}


console.log("Testing calcWordFrequencies()...");
calcWordFrequencies("hey hi Mark hi mark");



// Do NOT remove the following line:
export default calcWordFrequencies;