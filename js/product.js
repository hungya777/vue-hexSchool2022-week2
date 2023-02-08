//匯入 Vue CDN 套件
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const app = createApp({
  data() {
    return {
      products: [],   //所有品項
      tempProduct: {}  //單一產品細節資訊
    }
  },
  methods: {
    // 驗證登入狀態
    checkLogin(){
      axios.post(`${url}/api/user/check`)
        .then((res) => {
          this.getAllProducts();
        }).catch((err) => {
          window.location = "./login.html"; // 轉址到登入頁面
        })
    },
    //取得 產品列表
    getAllProducts() {
      axios.get(`${url}/api/${api_path}/admin/products`)
        .then((res)=> {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        })
    }
  },
  mounted() {
    // 將 cookie 取出來 (MDN文件提供的方式)
    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];
    // 透過 axios 將token(即取出的cookie值) 發送到headers
    axios.defaults.headers.common['Authorization'] = cookieValue;
    this.checkLogin();
  }
});

app.mount('#app');