const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("show");
})

//nav bar scroll:
window.onscroll = function() {scrollFunc()};
scrollFunc = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("navbar").style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        document.getElementById("navbar").style.transition = "1s"
      } else {
        document.getElementById("navbar").style.background = "transparent";
      }
}
