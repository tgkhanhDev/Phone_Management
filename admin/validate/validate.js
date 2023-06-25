function showMessage(idSpan, message) {
    document.getElementById(idSpan).innerText = message;
}

function checkPrice(idSpan, price) {

    if (price < 0) {
        showMessage(idSpan, "Giá sản phẩm không hợp lệ")
        return false;
    }
    else {
        showMessage(idSpan, "")
        return true;
    }
}
function checkNone(idSpan, value) {
    if (value == '') {
        showMessage(idSpan, 'Vui lòng điền giá trị vào');
        return false;
    }
    else {
        showMessage(idSpan, '');
        return true;
    }
}
function checkLink(idSpan, link) {
    var regex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!regex.test(link)) {
        showMessage(idSpan, 'Link ảnh không hợp lệ');
        return false;
    }
    else {
        showMessage(idSpan, '');
        return true;
    }
};

function checkType(idSpan, value) {
    if (value == "Choose a Brand") {
        showMessage(idSpan, 'Vui lòng chọn loại sản phẩm');
        return false;
    }
    else {
        showMessage(idSpan, '');
        return true;
    }
}