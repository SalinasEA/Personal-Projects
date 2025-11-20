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
The fetchQuotes() function in quote.js is called with the selected topic when the Fetch Topic button is clicked. Currently, fetchQuotes() displays example quotes in an ordered list inside the <div> with ID quotes.

Modify fetchQuotes() to use $.get() or $.ajax() to request quotes from the quote web API. Indicate that the request is expecting a JSON response. Display the returned quote in the ordered list. Each quote should be followed by a space, a dash, a space, and the source.

Ex: If the user chooses "love" and "3" and presses Fetch Quotes, the returned quotes and sources should be displayed in an ordered list inside the <div>:

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

$(function () {
   // When the 'fetchQuotesBtn' button is clicked
   $("#fetchQuotesBtn").click(function () {
      // Get the selected topic and count from the drop-down lists
      const selectedTopic = $("#topicSelection option:selected").val();
      const selectedCount = $("#countSelection option:selected").val();

      // Call the fetchQuotes function with the selected topic and count
      fetchQuotes(selectedTopic, selectedCount);
   });
});

// Function to fetch quotes based on topic and count
function fetchQuotes(topic, count) {
   // AJAX request to fetch quotes from the API
   $.ajax({
      url: "https://wp.zybooks.com/quotes.php", // API URL
      method: "GET", // HTTP method
      data: { topic: topic, count: count }, // Pass topic and count as parameters
      dataType: "json" // Expect JSON response
   })
      .done(function (data) {
         // If the data exists and has quotes
         if (data && data.length > 0) {
            let html = "<ol>"; // Initialize an ordered list for quotes
            for (let i = 0; i < count; i++) {
               html += `<li>${data[i].quote} - ${data[i].source}</li>`; // Add each quote to the list
            }
            html += "</ol>"; // Close the list
            $("#quotes").html(html); // Display the quotes in the #quotes element
         } else {
            // If no quotes are found, display a message
            $("#quotes").html(`Topic '${topic}' not found`);
         }

      })
      .fail(function () {
         // If the AJAX request fails, display an error message
         $("#quotes").html(`Topic '${topic}' not found`);
      });
}