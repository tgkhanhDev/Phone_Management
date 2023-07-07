returnIDforEachType = (item) => {
  if (item.type === "Iphone") {
    return "apple-frame";
  } else if (item.type === "Samsung") {
    return "samsung-frame";
  } else if (item.type === "Xiaomi") {
    return "xiaomi-frame";
  }
};

renderProductList = (productArr) => {
  var contentHTML_IP = "";
  var contentHTML_SS = "";
  var contentHTML_XM = "";
  var contentHTML_ALL = "";
  productArr.forEach((item) => {
    var productID = returnIDforEachType(item);
    var content = `
            <div
                class="phoneItem relative flex flex-col gap-4 py-4 px-6 shadow-2xl rounded-2xl justify-between" id="${productID}"
              >
                <!-- layer  -->
                <div
                  class="absolute w-full h-full top-0 left-0 rounded-2xl bg-black bg-opacity-80 text-white py-4 px-6 flex flex-col justify-between"
                >
                  <p class="w-full h-1/3 flex justify-center text-3xl">
                    Specifications
                  </p>
                  <div class="screen flex flex-col gap-2">
                    <p>Screen:${item.screen}</p>
                    <p>Back Camera:${item.backCamera}</p>
                    <p>Front Camera:${item.frontCamera}</p>
                  </div>
                  <div class="detail flex justify-center">
                    <a href="" class="underline"
                      ><p>click here for more details</p></a
                    >
                  </div>
                  <div class="flex justify-center">
                    <button class="bg-yellow-600 px-4 py-2 rounded-2xl hover:bg-yellow-700 transition duration-150 ease-out hover:ease-in" 
                    onclick="addCart(${item.id})"
                    >Add to cart</button>
                  </div>
                </div>
                <!-- ========== -->
                <div class="w-full h-1/2">
                  <img
                    src="${item.img}"
                    alt="phoneimg"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="flex flex-col justify-center items-center">
                  <p class="font-bold" id="item_name">${item.name}</p>
                  <div class="flex gap-2">
                    <!-- original price -->
                  <p class="text-lg">$${item.price}</p>
                    <!-- Fake no-discount price  -->
                  <p class="text-red-500 line-through">$${
                    parseInt(item.price) + 300
                  }</p>
                </div>
                </div>
                <div>
                  <div
                    class="inline-block whitespace-no-wrap bg-gray-200 px-3 rounded"
                  >
                    ${item.type}
                  </div>
                </div>
                <p class="overflow-auto">Description:${item.desc}</p>
                <div class="flex justify-between">
                  <div class="rate text-yellow-400">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div class="status text-green-700">In Stock</div>
                </div>
              </div>            
            </div>
        `;
    if (item.type === "Iphone") {
      contentHTML_IP += content;
    } else if (item.type === "Samsung") {
      contentHTML_SS += content;
    } else if (item.type === "Xiaomi") {
      contentHTML_XM += content;
    }
    contentHTML_ALL += content;
  });

  const optionValue = document.getElementById("option-value").value;
  if (optionValue === "apple") {
    document.getElementById("item-frame").innerHTML = contentHTML_IP;
  } else if (optionValue === "samsung") {
    document.getElementById("item-frame").innerHTML = contentHTML_SS;
  } else if (optionValue === "xiaomi") {
    document.getElementById("item-frame").innerHTML = contentHTML_XM;
  } else if (optionValue === "all") {
    document.getElementById("item-frame").innerHTML = contentHTML_ALL;
  }
};

// lấy dữ liệu từ local
transferToLocal = (pushList, LocalName) => {
  let data = JSON.stringify(pushList);
  localStorage.setItem(LocalName, data);
};

//renderSpanCart
RenderNumOfitemInCart = () => {
  document.getElementById("itemNumber").innerHTML = cartListItems.length;
  document.getElementById("itemNumber_hidden").innerHTML = cartListItems.length;
};

//chạy sau khi onclick"add to cart"
sortSameEle = (arr) => {
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    let exists = false;
    for (let j = 0; j < newArr.length; j++) {
      if (arr[i].id === newArr[j].id) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

renderCart = () => {
  let contentHTML = ``;
  let newArr = [];
  newArr = sortSameEle(cartListItems);
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
    contentHTML += content;
  });
  document.getElementById("cart-item").innerHTML = contentHTML;
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

//Dùng để tính tiền
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

//phải xóa ptử
decreaseNumber = (price, id) => {
  const CartItemNumber_ID = document.getElementById(`CartItemNumber${id}`);
  let CartItemValue = CartItemNumber_ID.innerText;
  if (CartItemValue != 0) {
    CartItemValue--;
    CartItemNumber_ID.innerText = CartItemValue;
  } else if (CartItemValue == 0) {
    removeFromCart();
  }
  ///cal price and DOM
  let totalPrice = price * CartItemValue;
  document.getElementById(`itemPrice${id}`).innerText = `$${totalPrice}`;
  //Xóa 1 Array bằng ID
  for (let i = cartListItems.length - 1; i >= 0; i--) {
    if (cartListItems[i].id == id) {
      cartListItems.splice(i, 1);
      break;
    }
  }
  RenderNumOfitemInCart();

  // tinhtien
  let subMoney = domToSubtotal();
  let ship = domToShipping(CartItemValue);
  let tax = domToTax(subMoney);
  domToTotal(subMoney, ship, tax);
};
//phải add ptử
increaseNumberForPage = () => {
  let sortedArr = [];
  sortedArr = sortSameEle(cartListItems);

  for (let i = 0; i < sortedArr.length; i++) {
    let dupItem = numOfItemDuplicate(sortedArr[i].id);
    let CartItemNumber_ID = document.getElementById(
      `CartItemNumber${sortedArr[i].id}`
    );
    CartItemNumber_ID.innerText = dupItem;

    ///cal price and DOM
    let totalPrice = sortedArr[i].price * dupItem;
    document.getElementById(
      `itemPrice${sortedArr[i].id}`
    ).innerText = `$${totalPrice}`;
    // tinhtien
    let subMoney = domToSubtotal();
    let ship = domToShipping(dupItem);
    let tax = domToTax(subMoney);
    domToTotal(subMoney, ship, tax);
  }
};
increaseNumber = (price, id) => {
  const CartItemNumber_ID = document.getElementById(`CartItemNumber${id}`);
  let CartItemValue = CartItemNumber_ID.innerText;
  CartItemValue++;
  CartItemNumber_ID.innerText = CartItemValue;
  ///cal price and DOM
  let totalPrice = price * CartItemValue;
  document.getElementById(`itemPrice${id}`).innerText = `$${totalPrice}`;

  //add vào Array bằng ID
  for (let i = 0; i < cartListItems.length; i++) {
    if (cartListItems[i].id == id) {
      cartListItems.push(cartListItems[i]);
      break;
    }
  }
  RenderNumOfitemInCart();
  // tinhtien
  let subMoney = domToSubtotal();
  let ship = domToShipping(CartItemValue);
  let tax = domToTax(subMoney);
  domToTotal(subMoney, ship, tax);
};
