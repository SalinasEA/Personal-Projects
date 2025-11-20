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
Step 1: Fetch the quotes
The fetchQuotes() function in quote.js is called with the selected topic and count when the Fetch Quotes button is clicked. Currently, fetchQuotes() calls showAnonymousQuotes() to display example quotes in an ordered list.

Modify fetchQuotes() to use the XMLHttpRequest object to request quotes from the quote web API. Set the XMLHttpRequest's responseType to expect a JSON response. Register responseReceivedHandler() as the XMLHttpRequest's load event handler.

Step 2: Display the quotes
Implement responseReceivedHandler() to extract the quotes from the XMLHttpRequest response and display the quotes in an ordered list. Each quote should be followed by a space, a dash, a space, and the source. You may find it helpful to repurpose the code in showAnonymousQuotes() to create the quote list.

Ex: If the user chooses "love" and "3" and clicks Fetch Quotes, responseReceivedHandler() should place the returned quotes in an ordered list inside the <div>:

<div id="quotes">
   <ol>
      <li>If I know what love is, it is because of you. - Hermann Hesse</li>
      <li>The opposite of love is not hate, it's indifference. - Elie Wiesel</li>
      <li>Suffering passes, while love is eternal. - Laura Ingalls Wilder</li>
   </ol>
</div>
*/


window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);
   });
});

function showAnonymousQuotes(count) {
   let html = "<ol>";
   for (let c = 1; c <= count; c++) {
      html += `<li>Quote ${c} - Anonymous</li>`;
   }
   html += "</ol>";

   document.querySelector("#quotes").innerHTML = html;
}

function fetchQuotes(userTopic, userCount) {
   let endpoint = "https://wp.zybooks.com/quotes.php?";
   let queryString = "topic=" + userTopic + "&count=" + userCount;
   let url = endpoint + queryString;

   let xhr = new XMLHttpRequest();
   xhr.responseType = "json";

   xhr.addEventListener("load", responseReceivedHandler);
   xhr.open("GET", url);
   xhr.send();

   //For testing: showAnonymousQuotes(count);
}

function responseReceivedHandler() {
   if (this.status === 200 && this.response.length > 0) {
      let responseArray = this.response;
      let html = "<ol>";

      for (let c = 0; c < responseArray.length; c++) {
         html += `<li>${responseArray[c].quote} - ${responseArray[c].source}</li>`;
      }
      html += "</ol>";

      document.querySelector("#quotes").innerHTML = html;
   }

   else {
      document.querySelector("#quotes").textContent = this.response.error;
   }
}