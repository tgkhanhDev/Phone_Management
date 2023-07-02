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
    }, 500);
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
          
          let numOfItem = numOfItemDuplicate(productId);
          ///số phần tử trùng >1 thì mới render lên cart
          if(numOfItem ==1){
            console.log("Arr if", cartListItems);
            //update số lượng
            RenderNumOfitemInCart();
            // update Item
            renderCart();
          } //tồn tại item sẵn thì ko push
          else {
            console.log("Arr else", cartListItems);
            renderCart();
            increaseNumberForPage(item.price, item.id);
            //update số lượng
            RenderNumOfitemInCart();
          }
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
function removeDuplicatesPreserveOrder(arr) {
  var uniqueElements = [];
  
  for (var i = 0; i < arr.length; i++) {
      var foundDuplicate = false;
      for (var j = 0; j < uniqueElements.length; j++) {
          if (isEqual(arr[i], uniqueElements[j])) {
              foundDuplicate = true;
              break;
          }
      }
      if (!foundDuplicate) {
          uniqueElements.push(arr[i]);
      }
  }

  return uniqueElements;
}

// A helper function to check if two objects are equal
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
renderCart = () => {
  let contentHTML = ``;
  let newArr=[];
  newArr=removeDuplicatesPreserveOrder(cartListItems);

  console.log("cartArr: ", cartListItems);
  console.log("newArr: ", newArr);
  newArr.forEach((item) => {
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
        <a class="text-red-600 underline cursor-pointer" onclick="removeFromCart(${item.id})">Remove</a>
      </div>
    </div>
    <div class="quantity flex justify-between px-6 py-5">
      <div class="right flex gap-5">
        <p class="font-bold">Quantity:</p>
        <div class="plusAndMinus space-x-1" >
          <i class="fa fa-minus-circle hover:text-blue-900" onclick="decreaseNumber(${item.price}, ${item.id})"></i>
          <span id="CartItemNumber${item.id}">1</span>
          <i class="fa fa-plus-circle hover:text-blue-900" onclick="increaseNumber(${item.price}, ${item.id})"></i>
        </div>
      </div>
      <div class="left font-bold" id="itemPrice${item.id}">$${item.price}</div>
    </div>
  </div>
    `;
    contentHTML+=content;

  });
  document.getElementById("cart-item").innerHTML = contentHTML;
};
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
};
numOfItemDuplicate = (id) => {
  let dup = 0;
  for (let i = 0; i < cartListItems.length; i++) {
    if (cartListItems[i].id == id) {
      dup++;
    }
  }
  return dup;
};

domToSubtotal = () => {
  var sum = 0;
  for (let i = 0; i < cartListItems.length; i++) {
    cartListItems[i].price = parseInt(cartListItems[i].price);
    sum += cartListItems[i].price;
  }
  document.getElementById("subtotal").innerText = `$${sum}`;
  return sum;
};

domToShipping = (itemValue) => {
  let ship = 0;
  if (itemValue == 0) {
    document.getElementById("ship").innerHTML = "$0";
    ship = 0;
  } else {
    document.getElementById("ship").innerHTML = "$10";
    ship = 10;
  }
  return ship;
};

domToTax = (money) => {
  let tax = money * 0.1;
  document.getElementById("tax").innerHTML = `$${tax}`;
  return tax;
};

domToTotal = (subtotal, ship, tax) => {
  let totalPrice = subtotal + ship + tax;
  document.getElementById("total").innerHTML = `$${totalPrice}`;
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
};

//Sweet Alert
let showSuccess = (title = "Thành công" /*default param*/) => {
  Swal.fire({
    position: "mid",
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
};

pay = () => {
  emptyPage();
  showSuccess("Thanh toán thành công");
};
