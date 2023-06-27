// nav button 
const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle("hidden");
  menu.classList.toggle("show");
})
//===============================================================
//nav bar scroll:
window.onscroll = function () { scrollFunc() };
scrollFunc = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    document.getElementById("navbar").style.transition = "1s"
  } else {
    document.getElementById("navbar").style.background = "transparent";
  }
}
//===============================================================

// option list 
let option = document.getElementById("option-value");
option.addEventListener('change', SelectionChange);

function SelectionChange() {
  const optionValue = document.getElementById("option-value").value;
  //pick class toggle
  let appFramedId = document.getElementById("apple-frame");
  let samFramedId = document.getElementById("samsung-frame");
  let xiaoFramedId = document.getElementById("xiaomi-frame");
  //if
  ((optionValue === "apple" || optionValue === "all") ? fetchProductList() : "none");
  ((optionValue === "samsung" || optionValue === "all") ? fetchProductList() : "none");
  ((optionValue === "xiaomi" || optionValue === "all") ? fetchProductList() : "none");
}

//===============================================================

//Lấy ra product từ API link
fetchProductList = () => {
  products.getList()
    .then((res) => {
      renderProductList(res.data); 
      console.log("res", res.data);
    })
    .catch((err) => {

    });
}
fetchProductList()


//Cart==================
a=() =>{
  document.getElementById("cartLayer").display="none";
  
}
//=====================