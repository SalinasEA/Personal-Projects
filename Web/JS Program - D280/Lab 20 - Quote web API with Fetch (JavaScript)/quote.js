/*
Quote web API
A quote web API returns a collection of randomly selected quotes related to a given topic. The API supports two query string parameters:

topic - Specifies the requested topic. Valid topics are love, motivational, wisdom, and humor.
count - Specifies the number of quotes requested and must be a number from 1 to 5.
Ex: The API request:

https://wp.zybooks.com/quotes.php?topic=love&count=3

returns 3 quotes about love, formatted in JSON:

[
   {
      "quote": "If I know what love is, it is because of you.",
      "source": "Hermann Hesse"
   },
   {
      "quote": "The opposite of love is not hate, it's indifference.",
      "source": "Elie Wiesel"
   },
   {
      "quote": "Suffering passes, while love is eternal.",
      "source": "Laura Ingalls Wilder"
   }
]

If the topic is not given or not recognized, the API returns an error message.

Ex: The request for a "success" quote:

https://wp.zybooks.com/quotes.php?topic=success&count=1

returns:

{
   "error": "Topic 'success' not found"
}
Fetch the quotes
The fetchQuotes() function in quote.js is called with the selected topic and count when the Fetch Quotes button is clicked. Currently, fetchQuotes() calls showAnonymousQuotes() to display example quotes in an ordered list.

Modify fetchQuotes() to use the Fetch API to request quotes from the quote web API. Call fetch() with an appropriate URL based on the topic and count parameters. Then display the quotes in an ordered list. Each quote should be followed by a space, a dash, a space, and the source. You may find it helpful to repurpose the code in showAnonymousQuotes() to create the quote list.

Ex: If the user chooses "love" and "3" and presses Fetch Quotes, fetchQuotes() should place the returned quotes in an ordered list inside the <div>:

<div id="quotes">
   <ol>
      <li>If I know what love is, it is because of you. - Hermann Hesse</li>
      <li>The opposite of love is not hate, it's indifference. - Elie Wiesel</li>
      <li>Suffering passes, while love is eternal. - Laura Ingalls Wilder</li>
   </ol>
</div>

If an error message is received, the error message should be displayed in the <div>. Ex:

<div id="quotes">
   Topic 'success' not found
</div>
*/

// Wait for DOM to load before setting up event listeners
window.addEventListener("DOMContentLoaded", function () {
   // Attach event listener to the fetch quotes button
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get the selected topic from the drop-down menu
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;

      // Get the selected count of quotes from the drop-down menu
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

      // Fetch and display the quotes based on selected topic and count
      fetchQuotes(selectedTopic, selectedCount);
   });
});

// Function to display anonymous quotes when needed
function showAnonymousQuotes(count) {
   let html = "<ol>";
   // Loop through and create a list of anonymous quotes
   for (let c = 1; c <= count; c++) {
      html += `<li>Quote ${c} - Anonymous</li>`;
   }
   html += "</ol>";

   // Update the quotes section with the anonymous quotes
   document.querySelector("#quotes").innerHTML = html
}

// Async function to fetch quotes from the API
async function fetchQuotes(topic, count) {
   // Define the URL to get quotes based on selected topic and count
   let url = `https://wp.zybooks.com/quotes.php?topic=${topic}&count=${count}`;

   try {
      // Use Fetch API to get the response from the URL
      let response = await fetch(url);

      // Check if the response is valid
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }

      // Parse the response as JSON
      let quotes = await response.json();

      // Check if there are quotes to display
      if (quotes.length > 0) {
         let html = "<ol>";
         // Loop through the quotes and add them to the HTML
         for (let c = 1; c <= count; c++) {
            html += `<li>${quotes[c - 1].quote} - ${quotes[c - 1].source}</li>`;
         }
         html += "</ol>";

         // Update the quotes section with the fetched quotes
         document.querySelector("#quotes").innerHTML = html;
      }
      else {
         // If no quotes were found, display a message
         html = `Topic '${topic}' not found`;
         document.querySelector("#quotes").textContent = html;
      }
   } catch (error) {
      // If there's an error with the fetch request, display an error message
      document.querySelector("#quotes").textContent = "Error fetching quotes: " + error.message;
   }

   // Optionally show anonymous quotes if API fails
   //showAnonymousQuotes(count);
}
