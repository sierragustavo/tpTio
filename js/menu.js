function cambioClaseNavegacion() {
  var x = document.querySelector("#barraNavegacion");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}
