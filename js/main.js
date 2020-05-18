import Building from "./Building.js";

(function() {
  let stories = prompt("Please enter the number of stories in the building", 7),
    elevators = prompt("Please enter the number of elevators to be used", 2),
    container = document.getElementById("building");
  if (!stories || !elevators) {
    alert("One of the required parameters is missing. Let's restart");
    window.location.reload();
  }
  const building = new Building({ stories, elevators, container });
})();
