// Assume index.html has already loaded hero.js, which defines SuperHero and SuperVillain

if (typeof SuperHero === "function" && typeof SuperVillain === "function") {
   const heroes = {
      "Super Bacon": new SuperHero("Jack Oinker", "Super Bacon", 2),
      "Flat-Man": new SuperHero("Peter Pranker", "Flat-Man", 5),
      "Mighty Woman": new SuperHero("Diana Dense", "Mighty Woman", 8),
      "Captain Marvelous": new SuperHero("Carol Hangers", "Captain Marvelous", 9)
   };

   const villains = {
      "The Jokester": new SuperVillain("Jack Nastier", "The Jokester", 3),
      "Magnet Man": new SuperVillain("Max Eisenhardt", "Magnet Man", 6),
      "Lex Loner": new SuperVillain("Lex Loner", "Lex Loner", 2),
      "Thankos": new SuperVillain("Thankos", "Thankos", 9)
   };

   registerHandlers();

   function registerHandlers() {
      // Detect selection of hero and villain
      document.querySelector("#heroSelect").addEventListener("change", selectionChanged);
      document.querySelector("#villainSelect").addEventListener("change", selectionChanged);

      selectionChanged();
   }

   function selectionChanged() {
      const selectedHeroValue = document.querySelector("#heroSelect").value;
      const selectedVillainValue = document.querySelector("#villainSelect").value;

      // Get selected hero and villain
      const selectedHero = heroes[selectedHeroValue];
      const selectedVillain = villains[selectedVillainValue];

      let winner;
      if (selectedHero.battle(selectedVillain)) {
         winner = selectedHero.alias;
      }
      else {
         winner = selectedVillain.alias;
      }

      document.querySelector("#winner").innerHTML = `Winner: ${winner}!`;
   }
}
