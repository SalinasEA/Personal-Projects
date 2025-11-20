/*
Step 1: Inspect the project
The project contains HTML, CSS, and two JavaScript files. The index.html file contains two drop-down widgets listing the names of super heroes and super villains. A paragraph with ID winner is empty but will display the winner of a battle between the selected hero and villain.

The index.js file contains the following:

Two constants, heroes and villains, that contain a list of SuperHero and SuperVillain objects.

A registerHandlers() function registers change event handlers for the two drop-down widgets.

A selectionChanged() function that is called when a hero or villain is selected. The function calls the selected hero's battle() method with the selected villain and displays the winner's alias in the winner paragraph.

The hero.js file is empty.

Step 2: Create three classes
Add the following to hero.js:

Create a SuperHuman class with properties name and powerLevel and a constructor that has name and powerLevel parameters.

Create SuperHero and SuperVillain classes that extend the SuperHuman class. Both classes should have a constructor that has name, alias, and powerLevel parameters, and the constructor should call the parent class's constructor with the given name and powerLevel.

Add a battle() method to the SuperHero class that has a SuperVillain parameter. battle() should return true if the hero's powerLevel is >= the villain's powerLevel, false otherwise.

Add a getEvilChuckle() method to the SuperVillain class that returns the string "Ha ha ha!".

When the modifications are complete, the webpage will show the winner between the selected hero and villain.
*/

// SuperHuman class: Represents a basic human with a name and power level.
class SuperHuman {
   name;           // Name of the superhuman
   powerLevel;     // Power level of the superhuman

   // Constructor to initialize name and power level
   constructor(name, powerLevel) {
      this.name = name;
      this.powerLevel = powerLevel;
   }
};

// SuperHero class: A subclass of SuperHuman that adds an alias and the ability to battle villains.
class SuperHero extends SuperHuman {
   alias;  // Alias of the superhero (e.g., "Superman", "Spiderman")

   // Constructor to initialize name, alias, and power level
   constructor(name, alias, powerLevel) {
      super(name, powerLevel);  // Call parent constructor (SuperHuman)
      this.alias = alias;       // Set alias for superhero
   }

   // Method for the superhero to battle a villain. Returns true if the hero is stronger than the villain.
   battle(villain) {
      if (this.powerLevel >= villain.powerLevel) {
         return true;  // Superhero wins if power level is greater or equal
      }
      else {
         return false; // Villain wins if power level is higher
      }
   }
};

// SuperVillain class: A subclass of SuperHuman that adds an alias and a signature evil laugh.
class SuperVillain extends SuperHuman {
   alias;  // Alias of the supervillain (e.g., "Lex Luthor", "Joker")

   // Constructor to initialize name, alias, and power level
   constructor(name, alias, powerLevel) {
      super(name, powerLevel);  // Call parent constructor (SuperHuman)
      this.alias = alias;       // Set alias for supervillain
   }

   // Method that returns the villain's evil laugh.
   getEvilChuckle() {
      return "Ha ha ha!";  // Villain's iconic laugh
   }
};
