const BASE_URL = "https://64871834beba6297278fe8bf.mockapi.io/products";
let productsServ = {
    getList: () => {
        return axios({
            url: BASE_URL,
            method: "GET",
        });
    },
    delete: (id) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "DELETE",
        });
    },
    add: (product) => {
        return axios({
            url: BASE_URL,
            method: "POST",
            data: product,
        })
    },
    getById: (id) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "GET",
        })
    },
    update: (product, id) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "PUT",
            data: product,
        })
    }
};