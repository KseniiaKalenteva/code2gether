var clickerButton = document.getElementById("clicker");
var clickerButton2 = document.getElementById("clicker2");

var onButtonClick = function() {
    clickerButton.textContent = "Heeey! Good choice ;)";
};

var onButtonClick2 = function() {
    clickerButton2.textContent = "Oh wow!";
};



clickerButton.addEventListener("click", onButtonClick);
clickerButton2.addEventListener("click", onButtonClick2);    