var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");
console.log(toggleButton);
toggleButton.onclick = function (){
    el.classList.toggle("toggled");
}