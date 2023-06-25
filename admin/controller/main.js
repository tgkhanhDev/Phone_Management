let idProduct = "";
function fetchProductList() {
    productsServ.getList()
        .then((res) => {
            renderList(res.data);

        })
        .catch((err) => {
            console.log("err");
        });
}
fetchProductList();
function deleteProduct(id) {
    onLoading();
    productsServ.delete(id)
        .then((res) => {
            fetchProductList();
            offLoading();
        })
        .catch((err) => {
            console.log(err);
            offLoading();
        });
}
function addPhone() {
    onLoading();
    if (validate(getInfo())) {

        productsServ.add(getInfo())
            .then((res) => {
                fetchProductList();
                offLoading();
            })
            .catch((err) => {
                console.log(err);
                offLoading();
            });
        ;
    }
    else {
        offLoading();
    }


}
function fix(id) {
    productsServ.getById(id)
        .then((res) => {
            setInfo(res.data);
            idProduct = id;
        })
        .catch((err) => {
            console.log(err);
        });
}
function fixPhone() {
    onLoading();
    productsServ.update(getInfo(), idProduct)
        .then((res) => {
            console.log(res);
            offLoading();
        })
        .catch((err) => {
            console.log(err);
            offLoading();
        });
}
function searchproducts() {
    let searchName = document.querySelector("#searchName").value;
    if (searchName != "") {
        productsServ.getList()
            .then((res) => {
                let data = res.data;
                data = data.filter((product) => product.name == searchName);
                renderList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        fetchProductList();
    }
}
function sort() {
    let typeSort = document.getElementById("sortPrice").value;
    if (typeSort == "tangdan") {
        productsServ.getList()
            .then((res) => {
                let data = res.data;
                data = data.sort((a, b) => a.price - b.price);
                renderList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        productsServ.getList()
            .then((res) => {
                let data = res.data;
                data = data.sort((a, b) => b.price - a.price);
                renderList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
function checkdata() {
    validate(getInfo());
}


offLoading();