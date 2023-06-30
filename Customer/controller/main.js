// nav button
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  menu.classList.toggle("show");
});
//===============================================================
//nav bar scroll:
window.onscroll = function () {
  scrollFunc();
};
scrollFunc = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.backgroundColor =
      "rgba(0, 0, 0, 0.7)";
    document.getElementById("navbar").style.transition = "1s";
  } else {
    document.getElementById("navbar").style.background = "transparent";
  }
};
//===============================================================

// option list
let option = document.getElementById("option-value");
option.addEventListener("change", SelectionChange);

function SelectionChange() {
  const optionValue = document.getElementById("option-value").value;
  //pick class toggle
  let appFramedId = document.getElementById("apple-frame");
  let samFramedId = document.getElementById("samsung-frame");
  let xiaoFramedId = document.getElementById("xiaomi-frame");
  //if
  optionValue === "apple" || optionValue === "all"
    ? fetchProductList()
    : "none";
  optionValue === "samsung" || optionValue === "all"
    ? fetchProductList()
    : "none";
  optionValue === "xiaomi" || optionValue === "all"
    ? fetchProductList()
    : "none";
}

//===============================================================

//Lấy ra product từ API link
fetchProductList = () => {
  products
    .getList()
    .then((res) => {
      renderProductList(res.data);
    })
    .catch((err) => {});
};
fetchProductList();

//Cart==================
var checktime = 0;
showPage = () => {
  checktime++;
  var cartLayer = document.getElementById("cartLayer");
  var cartPage = document.getElementById("cartPage");

  if (checktime % 2 != 0) {
    cartPage.classList.toggle("hidden");
    cartLayer.classList.toggle("hidden");
    setTimeout(function () {
      cartPage.classList.toggle("opacity-0");
      cartLayer.classList.toggle("opacity-0");
    }, 10);
  } else if (checktime % 2 == 0) {
    cartPage.classList.toggle("opacity-0");
    cartLayer.classList.toggle("opacity-0");
    setTimeout(function () {
      cartPage.classList.toggle("hidden");
      cartLayer.classList.toggle("hidden");
    }, 1000);
  }
};
//=====================

//Add to cart===========
var cartListItems = [];

// lấy dữ liệu từ local
transferToLocal(cartListItems, "CartList");

//bỏ item vào Array
pushCartItemtoArrByID = (id) => {};

RenderNumOfitemInCart = () => {
  document.getElementById("itemNumber").innerHTML = cartListItems.length + 1;
};

addCart = (productId) => {
  //lấy list ra rr so sánh với ID => xuất toàn bộ thông tin
  products
    .getList()
    .then((res) => {
      var i = 0;
      res.data.forEach((item) => {
        if (item.id == productId) {
          cartListItems.push(res.data[i]);
        }
        i++;
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //update số lượng
  RenderNumOfitemInCart();
  // update Item
  renderCart();
};

//======================

//chạy sau khi onclick"add to cart"
renderCart = () => {
  console.log("List hiện tại: ", cartListItems);
  console.log(cartListItems[0]);
};
checkCart = () => {};
