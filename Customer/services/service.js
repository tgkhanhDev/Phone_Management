const BASE_URL = "https://64871834beba6297278fe8bf.mockapi.io/products";
let products ={
    getList:() => {
        return axios({
            url: BASE_URL,
            method: "GET",
        });
    },
}