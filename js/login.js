//匯入 Vue CDN 套件
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    //登入功能:
    //1. 取得HTML的 username跟password
    //2. 發出請求
    login() {
      axios.post(`${url}/admin/signin`, this.user)
        .then((res) => {
          // 透過「解構」手法來進行宣告，變數名稱與資料來源的名稱是一樣的
          const { expired, token } = res.data;
          // 加上 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`; //透過new Date()將到期日轉為時間格式

          // 轉址到產品頁面
          window.location = "./product.html";
        }).catch((err) => {
          alert(err.data.message);
        })
    }
  }
});

app.mount('#app')