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

//Add to cart=============================================================
var cartListItems = [];

addCart = (productId) => {
  //lấy list ra rr so sánh với ID => xuất toàn bộ thông tin
  products
    .getList()
    .then((res) => {
      var i = 0;
      res.data.forEach((item) => {
        if (item.id == productId) {
          cartListItems.push(res.data[i]);
          //update số lượng
          RenderNumOfitemInCart();

          // update Item
          renderCart();
        }
        i++;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//======================
// bỏ dữ liệu lên local
transferToLocal(cartListItems, "CartList");

//bỏ item vào Array
pushCartItemtoArrByID = (id) => {};

RenderNumOfitemInCart = () => {
  document.getElementById("itemNumber").innerHTML = cartListItems.length;
};

//chạy sau khi onclick"add to cart"
renderCart = () => {
  let contentHTML = ``;
  cartListItems.forEach((item) => {
    priceMul = () => {
      let priceMulValue = document.getElementById("itemNumber").textContent;
      if (priceMulValue == 0) {
        return 1;
      } else {
        return priceMulValue;
      }
    };

    let content = `
    <div class="item">
    <div class="imgAndInfo flex">
      <img
        src="${item.img}"
        alt="Photo"
        width="50%"
      />
      <div class="info flex flex-col gap-5">
        <p class="font-bold">${item.name}</p>
        <div class="desc">
          <p>Screen:${item.screen}</p>
          <p>Back Camera:${item.backCamera}</p>
          <p>Font Camera:${item.frontCamera}</p>
        </div>
        <a class="text-red-600 underline onclick="removeFromCart()">Remove</a>
      </div>
    </div>
    <div class="quantity flex justify-between px-6 py-5">
      <div class="right flex gap-5">
        <p class="font-bold">Quantity:</p>
        <div class="plusAndMinus space-x-1">
          <i class="fa fa-minus-circle hover:text-blue-900" onclick="decreaseNumber(${item.price})"></i>
          <span id="CartItemNumber">0</span>
          <i class="fa fa-plus-circle hover:text-blue-900" onclick="increaseNumber(${item.price})"></i>
        </div>
      </div>
      <div class="left font-bold" id="itemPrice">$${item.price}</div>
    </div>
  </div>
    `;
    contentHTML += content;
  });
  document.getElementById("cart-item").innerHTML = contentHTML;
};
checkCart = () => {};
