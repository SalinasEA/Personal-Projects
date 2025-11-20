/*
Step 1: Examine the JavaScript
The given todo.js file implements three functions:

ready event handler - Registers addBtnClick() as the click callback function for the Add button and calls addBtnClick() if the user hits Enter while typing a new item.

addBtnClick() - Extracts the text typed into the text box and calls addItem() to add the new item.

addItem() - Creates a list item for the newly entered item that contains the item text, and creates up, down, and done buttons. Clicking the up and down buttons calls moveItem(), and clicking the done button calls removeItem(). The function is incomplete.

Step 2: Modify addItem()
Modify addItem() to use the jQuery append() method. First, append $upButton, $downButton, $doneButton to $newItem to create a single <li> element containing the item text and three buttons. Then append $newItem to the item list (<ol> element). 

After the modifications are complete, the user should be able to add new items to the end of the list.

Step 3: Implement moveItem()
Modify moveItem() to move the <li> at the given fromIndex to the given toIndex. Ex: moveItem(0, 1) should move the first <li> (at index 0) to the second <li> (at index 1). Use the jQuery methods detach(), insertBefore(), and insertAfter() where appropriate. moveItem() should ignore nonsensical movements, like moving the first item up or the last item down.

After the modifications are complete, the user should be able to click the up button (↑) to move the item up one spot and the down button (↓) to move the item down one spot.

Step 4: Implement removeItem()
Modify removeItem() to remove the <li> at the given index. Ex: removeItem(2) should remove the third <li> (at index 2). Use the jQuery remove() method to remove the appropriate <li>.

After the modifications are complete, the user should be able to click the done button (✓) to remove the item from the list.
*/

// HTML for the up, down, and done buttons
const upButtonHtml = '<button class="upBtn">&uarr;</button>'; // Button to move item up
const downButtonHtml = '<button class="downBtn">&darr;</button>'; // Button to move item down
const doneButtonHtml = '<button class="doneBtn">&#x2713;</button>'; // Button to mark item as done (remove item)

// jQuery document ready function
$(function () {
   // When the 'addBtn' button is clicked, call addBtnClick function
   $("#addBtn").on("click", addBtnClick);

   // Add item if user presses Enter key while focused on the input field
   $("#newItemText").on("keyup", function (event) {
      if (event.key === "Enter") { // Check if the Enter key was pressed
         addBtnClick(); // Call addBtnClick to add the item
      }
   });
});

// Function to handle adding a new item when the button is clicked or Enter is pressed
function addBtnClick() {
   let itemText = $("#newItemText").val().trim(); // Get and trim the text input value

   // Don't add empty strings
   if (itemText.length !== 0) { // Ensure input isn't empty
      addItem(itemText); // Call addItem to add the new item

      // Clear the input text and put focus back in the text field for the next item
      $("#newItemText").val("").focus();
   }
}

// Function to add a new item to the list
function addItem(item) {
   // Create a new <li> element with the item text
   let $newItem = $(`<li><span>${item}</span></li>`);
   // Get the ordered list element
   let $itemList = $("ol");

   // Create an up button that moves the item up one spot in the list
   let $upButton = $(upButtonHtml).on("click", function () {
      let index = $(this.parentElement).index(); // Get the current index of the item
      moveItem(index, index - 1); // Move item up by one index
   });

   // Create a down button that moves the item down one spot in the list
   let $downButton = $(downButtonHtml).on("click", function () {
      let index = $(this.parentElement).index(); // Get the current index of the item
      moveItem(index, index + 1); // Move item down by one index
   });

   // Create a done button that removes the item from the list
   let $doneButton = $(doneButtonHtml).on("click", function () {
      // Get the index of the item to be removed
      let index = $(this.parentElement).index();
      removeItem(index); // Call removeItem to remove the item
   });

   // Append the buttons to the new item and add it to the list
   $newItem.append($upButton, $downButton, $doneButton);
   $itemList.append($newItem); // Append the new item to the ordered list
}

// Function to move an item in the list from one index to another
function moveItem(fromIndex, toIndex) {
   let $allItems = $("li"); // Get all list items
   // Check if the item can be moved up or down within valid bounds
   if (toIndex < fromIndex && toIndex >= 0) { // If moving up
      let $item = $(`li:eq(${fromIndex})`).detach(); // Detach the item from the list
      $(`li:eq(${toIndex})`).before($item); // Insert the item before the target index
   }
   else if (toIndex > fromIndex && toIndex <= ($allItems.length - 1)) { // If moving down
      let $item = $(`li:eq(${fromIndex})`).detach(); // Detach the item from the list
      $(`li:eq(${fromIndex})`).after($item); // Insert the item after the target index
   }
}

// Function to remove an item from the list based on its index
function removeItem(index) {
   let $removeItem = $(`li:eq(${index})`).remove(); // Remove the item at the specified index
}
