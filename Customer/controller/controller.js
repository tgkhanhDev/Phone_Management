returnIDforEachType =(item) =>{
    if(item.type === "Iphone"){
        return "apple-frame";
    }else if(item.type === "Samsung"){
        return "samsung-frame";
    }else if(item.type === "Xiaomi"){
        return "xiaomi-frame";
    }
}

renderProductList = (productArr) => {
    var contentHTML_IP="";
    var contentHTML_SS="";
    var contentHTML_XM="";
    productArr.forEach(item => {
        var productID= returnIDforEachType(item);
        var content=`
            <div
                class="relative flex flex-col gap-4 py-4 px-6 shadow-2xl rounded-2xl" id="frame"
              >
                <!-- layer  -->
                <div
                  class="absolute w-full h-full top-0 left-0 rounded-2xl bg-black bg-opacity-80 text-white py-4 px-6 flex flex-col justify-between"
                >
                  <p class="w-full h-1/3 flex justify-center text-4xl">
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
                  <div class="inline-block flex justify-center">
                    <button class="bg-yellow-600 px-4 py-2 rounded-2xl hover:bg-yellow-700 transition duration-150 ease-out hover:ease-in">Add to cart</button>
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
                  <p class="font-bold">${item.name}</p>
                  <p class="">$${item.price}</p>
                </div>
                <div>
                  <div
                    class="inline-block whitespace-no-wrap bg-gray-200 px-3 rounded"
                  >
                    ${item.type}
                  </div>
                </div>
                <p>Description:${item.desc}</p>
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
        `
        if(item.type === "Iphone"){
            contentHTML_IP+= content;
        }else if(item.type === "Samsung"){
            contentHTML_SS+=content;
        }else if(item.type === "Xiaomi"){
            contentHTML_XM+=content;
        }
    }
    );
    document.getElementById("apple-frame").innerHTML = contentHTML_IP;
    document.getElementById("samsung-frame").innerHTML = contentHTML_SS;
    document.getElementById("xiaomi-frame").innerHTML = contentHTML_XM;
};