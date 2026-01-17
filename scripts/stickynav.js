window.onscroll = function() {stickNav()};

var navbar = document.getElementById("nav");
var sticky = navbar.offsetTop;

function stickNav() {

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("indicator").style.width = scrolled + "%";
    
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        
    } else {
        navbar.classList.remove("sticky");
    }
}