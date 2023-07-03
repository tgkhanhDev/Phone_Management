let cartListItems = [];
//render cartList từ local
var dataJSON_cartListItem = localStorage.getItem("CartList");
if(dataJSON_cartListItem != null){
  cartListItems = JSON.parse(dataJSON_cartListItem);
  renderCart();
  RenderNumOfitemInCart();
  increaseNumberForPage();
}

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
    .catch((err) => { });
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
    }, 500);
  }
};
//=====================

//Add to cart=============================================================

addCart = (productId) => {
  //lấy list ra rr so sánh với ID => xuất toàn bộ thông tin
  products
    .getList()
    .then((res) => {
      var i = 0;
      res.data.forEach((item) => {
        if (item.id == productId) {
          cartListItems.push(res.data[i]);

          let numOfItem = numOfItemDuplicate(productId);
          ///số phần tử trùng >1 thì mới render lên cart
          if (numOfItem == 1) {
            //update số lượng
            RenderNumOfitemInCart();
            // update Item
            renderCart();
            increaseNumberForPage(item.price);
          } //tồn tại item sẵn thì ko push
          else {
            renderCart();
            increaseNumberForPage();
            //update số lượng
            RenderNumOfitemInCart();
          }
        }
        i++;
      });
      // bỏ dữ liệu lên local
      transferToLocal(cartListItems, "CartList");
    })
    .catch((err) => {
      console.log(err);
    });
};

//======================

removeFromCart = (id) => {
  //Phải loop ngược vì khi splice, arraylength bị giảm đi
  for (let i = cartListItems.length - 1; i >= 0; i--) {
    if (cartListItems[i].id == id) {
      cartListItems.splice(i, 1);
    }
  }
  //renderCart sau xóa
  renderCart();
  //reder number item
  RenderNumOfitemInCart();
  transferToLocal(cartListItems, "CartList");
};

///Pay
emptyPage = () => {
  for (let i = cartListItems.length - 1; i >= 0; i--) {
    cartListItems.splice(i, 1);
  }
  renderCart();
  RenderNumOfitemInCart();
  //refresh tinh tien
  document.getElementById("subtotal").innerText = `$0`;
  document.getElementById("ship").innerHTML = "$0";
  document.getElementById("tax").innerHTML = "$0";
  document.getElementById("total").innerHTML = "$0";
  transferToLocal(cartListItems, "CartList");
};

pay = () => {
  emptyPage();
  showSuccess("Thanh toán thành công");
  transferToLocal(cartListItems, "CartList");
};
