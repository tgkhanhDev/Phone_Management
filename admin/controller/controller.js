function renderList(productArr) {
    let contentHTML = "";
    productArr.forEach((item) => {
        let content = `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.img}</td>
        <td>${item.desc}</td>
        <td>
            <div class="inline-flex">
                <button  onclick="fix(${item.id})" data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l flex-inline">
                    Sửa<i class="fa fa-edit"></i>
                </button>
                <button onclick ="deleteProduct(${item.id})" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                    Xoá <i class="fa fa-trash-alt"></i>
                </button>
            </div>
        </td>
        </tr>`
        contentHTML += content;
    });
    document.getElementById("data").innerHTML = contentHTML;
}
function getInfo() {
    name = document.getElementById("phoneName").value;
    price = document.getElementById("phonePrice").value;
    screen = document.getElementById("phoneScreen").value;
    backCamera = document.getElementById("phoneBackCamera").value;
    frontCamera = document.getElementById("phoneFrontCamera").value;
    img = document.getElementById("phoneImg").value;
    desc = document.getElementById("phoneDesc").value;
    type = document.getElementById("phoneType").value;
    return {
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type,
    }
}
function setInfo(item) {
    console.log(item);
    document.getElementById("phoneName").value = item.name;
    document.getElementById("phonePrice").value = item.price;
    document.getElementById("phoneScreen").value = item.screen;
    document.getElementById("phoneBackCamera").value = item.backCamera;
    document.getElementById("phoneFrontCamera").value = item.frontCamera;
    document.getElementById("phoneImg").value = item.img;
    document.getElementById("phoneDesc").value = item.desc;
    document.getElementById("phoneType").value = item.type;
    document.getElementById("phoneType").text = item.type;
}
function validate(product) {
    var isValid = checkNone("tbName", product.name);
    isValid &= checkNone("tbPrice", product.price) && checkPrice("tbPrice", product.price);
    isValid &= checkNone("tbScreen", product.screen);
    isValid &= checkNone("tbBackCamera", product.backCamera);

    isValid &= checkNone("tbFrontCamera", product.frontCamera);

    isValid &= checkNone("tbLink", product.img) && checkLink("tbLink", product.img);
    isValid &= checkType("tbType", product.type);
    return isValid;
}
function onLoading() {
    document.getElementById("spinner").style.display = "flex";
}

function offLoading() {
    document.getElementById("spinner").style.display = "none";
}