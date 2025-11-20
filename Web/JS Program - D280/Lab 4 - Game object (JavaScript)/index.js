/*
Modify the game object in index.js:

Add two properties: lives - initially 3, and coins - initially 0.
Add a getter called points that returns coins * 10.
Add a playerDies() method that subtracts 1 from lives if lives is greater than 0.
Add a newGame() method that sets lives to 3 and coins to 0.
The index.js file includes several statements that are currently commented-out. When the game object is completely implemented, remove the comments and run the code to verify the game object works correctly.
*/

// Object representing a simple game with lives, coins, and a point system
let game = {
   lives: 3, // Initial number of lives
   coins: 0, // Initial number of coins

   // Getter to calculate points based on collected coins
   get points() {
      return this.coins * 10;
   },

   // Method to handle player losing a life
   playerDies() {
      if (this.lives > 0) {
         this.lives -= 1;
      }
   },

   // Method to reset the game to its initial state
   newGame() {
      this.lives = 3;
      this.coins = 0;
   }
};


console.log("Testing game object...");


console.log("lives = " + game.lives);    // should be 3
console.log("coins = " + game.coins);    // should be 0
console.log("points = " + game.points);  // should be 0
game.coins = 2;
console.log("points = " + game.points);  // should be 20
game.playerDies();
console.log("lives = " + game.lives);    // should be 2
game.playerDies();
game.playerDies();
game.playerDies();
console.log("lives = " + game.lives);    // should be 0
game.newGame();
console.log("lives = " + game.lives);    // should be 3
console.log("coins = " + game.coins);    // should be 0


// Do NOT remove the following line:
export default game;