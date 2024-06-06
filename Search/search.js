
var clicked = false;

function myfunction() {
clicked = !clicked;
const el = document.getElementById("btn");
if (clicked) {
el.style.color = "red"
} else {
el.style.color = "white"
}
}





function toggleSidebar() {
    var sidebar = document.getElementById("sidebar-custom");
    sidebar.classList.toggle("show");
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        var sidebar = document.getElementById("sidebar-custom");
        if (sidebar.classList.contains("show")) {
            sidebar.classList.remove("show");
        }
    }
});

function toggleHeart(element) {
    element.classList.toggle('clicked');
}
