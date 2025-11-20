/*
Step 1: Inspect the project
The project contains HTML, CSS, and JavaScript files. The groceries.js file contains several completed functions:

The DOMContentLoaded event handler registers click handlers for the Add and Clear buttons, calls loadList() to load items from localStorage into the groceryList array, and calls showItem() to display the items in groceryList.

enableClearButton() enables or disables the Clear button.

showItem() displays a single item at the end of an ordered list.

addBtnClick() calls showItem() to display the item, adds the item to the groceryList array, and calls saveItem() to save the item to localStorage.

clearBtnClick() clears the groceryList array and removes all the items from the ordered list.

Step 2: Complete the functions
Complete the JavaScript functions below so the list is restored when the page is reloaded:

loadList() should load a grocery list from localStorage and return an array containing each item. Assume the list is stored as a single comma-delimited string. Ex: The list stored as "orange juice,milk,cereal" is returned as the array ["orange juice", "milk", "cereal"]. An empty array should be returned if localStorage does not contain a grocery list.

saveList() should save the given groceryList array to localStorage as a single comma-delimited string. Ex: The array ["orange juice", "milk", "cereal"] should be saved as the string "orange juice,milk,cereal".

clearList() should remove the grocery list from localStorage.

All three functions should use the localStorage item called "list".
*/

let groceryList = []; // Initialize an empty grocery list

// Wait until the DOM is loaded before adding event listeners
window.addEventListener("DOMContentLoaded", function () {
   // Set up event listeners for the buttons
   document.querySelector("#addBtn").addEventListener("click", addBtnClick);
   document.querySelector("#clearBtn").addEventListener("click", clearBtnClick);

   // Load the grocery list from localStorage
   let tempList = loadList();
   if (tempList) {
      groceryList = tempList;  // If items exist, assign them to groceryList
   }

   // If there are items in the list, display them; otherwise, disable the clear button
   if (groceryList.length > 0) {
      for (let item of groceryList) {
         showItem(item);  // Display each item in the list
      }
   }
   else {
      enableClearButton(false);  // Disable the clear button if there are no items
   }
});

// Function to enable or disable the Clear button
function enableClearButton(enabled) {
   document.querySelector("#clearBtn").disabled = !enabled;
}

// Function to display an item in the ordered list
function showItem(item) {
   let list = document.querySelector("ol");
   list.innerHTML += `<li>${item}</li>`;  // Add item to the list in HTML
}

// Function that handles the add button click event
function addBtnClick() {
   let itemTextInput = document.querySelector("#item");
   let item = itemTextInput.value.trim();  // Get the input value and trim any extra spaces

   // If the input is not empty, add the item to the list
   if (item.length > 0) {
      enableClearButton(true);  // Enable the Clear button
      showItem(item);           // Display the new item
      groceryList.push(item);   // Add the item to the groceryList array

      // Save the updated grocery list to localStorage
      saveList(groceryList);
   }

   // Clear the input field and set focus back on it
   itemTextInput.value = "";
   itemTextInput.focus();
}

// Function that handles the clear button click event
function clearBtnClick() {
   enableClearButton(false);  // Disable the Clear button
   groceryList = [];          // Clear the grocery list
   let list = document.querySelector("ol");
   list.innerHTML = "";       // Clear the displayed list in the HTML

   // Remove the grocery list from localStorage
   clearList();
}

// Function to load the grocery list from localStorage
function loadList() {
   if (localStorage.getItem("list")) {  // If a list exists in localStorage
      let groceryList = localStorage.getItem("list");  // Get the list as a string
      let arrayList = groceryList.split(",");           // Split the string into an array
      return arrayList;                                // Return the array of items
   }
   else {
      return [];  // If no list exists, return an empty array
   }
}

// Function to save the grocery list to localStorage
function saveList(groceryList) {
   let list = "";  // Initialize an empty string to store the list items
   for (let i = 0; i < groceryList.length - 1; i++) {
      list += `${groceryList[i]},`;  // Add each item followed by a comma
   }

   list += `${groceryList[groceryList.length - 1]}`;  // Add the last item without a comma

   // Save the list string to localStorage
   localStorage.setItem("list", list);
}

// Function to remove the grocery list from localStorage
function clearList() {
   localStorage.removeItem("list");  // Remove the list from localStorage
}
