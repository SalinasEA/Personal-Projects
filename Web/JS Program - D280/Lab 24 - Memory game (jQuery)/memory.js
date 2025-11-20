/*
Step 1: Inspect the JavaScript
The given memory.js file implements several functions:

ready event handler - Adds <div> elements to the card grid and adds click event handlers to each card that calls clickCard() with an index that indicates which card is clicked. The global $cardDivs array is initialized with all the div elements.

clickCard() - Calls showCard() to display the first and second cards selected and calls hideCard() if the two selected cards do not match.

showCard() - Shows a card by setting the card's inner HTML and color and adding the card-visible class.

hideCard() - Hides a card by removing the card's inner HTML and removing the card-visible class.

showMatch() - Currently does nothing.

newGame() - Starts a new game by randomizing and hiding all the cards.

Step 2: Animate showing a card
Make the following modifications to animate the card flipping over:

In the ready event handler, call the jQuery method hide() to hide the $game before the for loop.

Modify showCard() so the card appears to flip over and display face-up:

Call slideUp() to slide up the back side of the card in 200 ms.

Then set the card's inner HTML and color, and add the card-visible class.

Finally, call slideDown() to have the card slide back down in 200 ms, revealing the card's symbol.

You may find the jQuery method queue() helpful to perform all the operations in the correct order.

Image shows blue rectangle sliding up in parts and then white rectangle sliding down with red heart.

Step 3: Animate hiding a card
Modify hideCard() so the card appears to flip over and display face-down:

Call the jQuery method slideUp() to slide up the face side of the card in 200 ms.

Then set the card's inner HTML to an empty string and remove the card-visible class.

Finally, call the jQuery method slideDown() to have the blue side of the card slide back down in 200 ms.

You may find the jQuery method queue() helpful to perform all the operations in the correct order.

Step 4: Animate matching cards
Modify showMatch() to animate two matching cards. Use setTimeout() to delay for half a second, then call the jQuery method animate() to make the two matching cards' symbol fonts grow in size from 75px to 100px in 200 milliseconds, then back down to 75px in 200 milliseconds.

Image shows yellow star using 70px font size at 500 ms, then 100px font size at 700 ms, then back to 70px at 900 ms.

Step 5: Animate starting a new game
Modify newGame() so clicking the New Game button fades out and in the game board:

Call fadeOut() to fade out the div with ID cardGrid.

Randomize the cards.

Hide the cards.

Call fadeIn() to make the cardGrid div visible again.

Use "normal" speed for both animations. Make sure the cards are not hidden until the fade out operation is completed.

After all modifications are complete, the cards will animate when being flipped, and two matching cards' symbols will grow and shrink in size when first matched. All the cards will fade in and out when a new game is started.
*/

// -1 means no guess has been made
let guessFirst = -1; // First guess placeholder
let guessSecond = -1; // Second guess placeholder

// Cards to be matched, each with an entity (symbol) and color
let cards = [
   {
      entity: "&spades;", // Symbol: Spade
      color: "green" // Color: Green
   },
   {
      entity: "&clubs;", // Symbol: Club
      color: "blue" // Color: Blue
   },
   {
      entity: "&hearts;", // Symbol: Heart
      color: "red" // Color: Red
   },
   {
      entity: "&diams;", // Symbol: Diamond
      color: "purple" // Color: Purple
   },
   {
      entity: "&starf;", // Symbol: Star
      color: "orange" // Color: Orange
   },
   {
      entity: "&malt;", // Symbol: Malt
      color: "gold" // Color: Gold
   },
];

// Create the match for each card (duplicate the array)
cards = cards.concat(cards);

let $cardDivs = []; // Array to hold references to card divs

// jQuery function to initialize game
$(function () {
   // Hide the game board initially and add divs for each card
   let $game = $("#cardGrid");
   $game.hide();

   for (let i = 0; i < cards.length; i++) {
      let $card = $("<div></div>"); // Create a div for each card
      $card.on("click", function () { clickCard(i); }); // Attach click event handler
      $game.append($card); // Append to the game grid
      $cardDivs.push($card); // Store the card div reference
   }

   newGame(); // Start a new game

   $("#newGameBtn").click(newGame); // Start a new game when the button is clicked
});

// Function to handle clicking a card
function clickCard(index) {
   // Only accept click on non-visible cards
   if (!$cardDivs[index].hasClass("card-visible")) {
      if (guessFirst == -1) { // If no first guess, set it
         showCard(index); // Flip the card
         guessFirst = index;
      }
      else if (guessSecond == -1) { // If no second guess, set it
         showCard(index); // Flip the second card
         guessSecond = index;

         // Check for a match between the two cards
         if (cards[guessFirst].entity == cards[guessSecond].entity) {
            showMatch(guessFirst, guessSecond); // Show match animation
            guessFirst = -1;
            guessSecond = -1;
         }
         else {
            // If no match, hide the cards after a short delay
            setTimeout(function () {
               hideCard(guessFirst);
               hideCard(guessSecond);
               guessFirst = -1;
               guessSecond = -1;
            }, 1000);
         }
      }
   }
}

// Function to display the card
function showCard(index) {
   $cardDivs[index].slideUp(200) // Slide up to hide the card
      .queue(function (next) {
         $(this).html(cards[index].entity) // Show the symbol of the card
            .css("color", cards[index].color) // Set the color of the card
            .addClass("card-visible"); // Mark the card as visible
         next();
      })
      .slideDown(200); // Slide down to show the card
}

// Function to hide the card
function hideCard(index) {
   $cardDivs[index].slideUp(200) // Slide up to hide the card
      .queue(function (next) {
         $(this).html("") // Clear the content
            .removeClass("card-visible"); // Remove visible class
         next();
      })
      .slideDown(200); // Slide down to finish hiding
}

// Function to animate a match (increase the font size to show match)
function showMatch(cardIndex1, cardIndex2) {
   setTimeout(function () {
      // Animate both matched cards by increasing their font size
      $cardDivs[cardIndex1].animate({
         fontSize: "+=25"
      }, 200);
      $cardDivs[cardIndex2].animate({
         fontSize: "+=25"
      }, 200)
         .queue(function (next) {
            // Animate both matched cards by decreasing their font size
            $cardDivs[cardIndex1].animate({
               fontSize: "-=25"
            }, 200);
            next();
         })
         .queue(function (next) {
            $cardDivs[cardIndex2].animate({
               fontSize: "-=25"
            }, 200);
            next();
         });
   }, 500);
}

// Function to initialize a new game
function newGame() {
   // Fade out the game grid, shuffle the cards, then fade the grid back in
   $("#cardGrid").fadeOut("normal")
      .queue(function (next) {
         // Randomize the cards array by swapping card values 20 times
         for (let i = 0; i < 20; i++) {
            let cardIndex1 = getRandomNumber(0, cards.length - 1);
            let cardIndex2 = getRandomNumber(0, cards.length - 1);
            let temp = cards[cardIndex1];
            cards[cardIndex1] = cards[cardIndex2];
            cards[cardIndex2] = temp;
         }

         // Hide all cards by clearing their content and removing visible class
         for (let i = 0; i < $cardDivs.length; i++) {
            $cardDivs[i].html("").removeClass("card-visible");
         }
         next();
      })
      .fadeIn("normal"); // Fade in the game grid

   // Reset guesses to no selection
   guessFirst = -1;
   guessSecond = -1;
}

// Function to return a random number between min and max (inclusive)
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
