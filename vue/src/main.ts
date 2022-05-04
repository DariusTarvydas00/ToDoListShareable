import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext"
import Button from "primevue/button";
import MenuComponent from "./component/MenuComponent.vue";
import Dropdown from "primevue/dropdown";

const app = createApp(App)
app.use(PrimeVue);
app.use(router);
app.use(createPinia());

axios.interceptors.request.use(request => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn&&request.headers) {
        request.headers.Authorization = ` ${isLoggedIn}`;
    }
    return request;
});

axios.get("/config/api-url.txt").then((result)=>{
    if(result.status&&result.status==200){
        axios.defaults.baseURL=result.data;
    }
}).catch(()=>{});

axios.defaults.baseURL="http://localhost:5000/";


app.component("Menubar", Menubar);
app.component("InputText", InputText);
app.component("Button",Button);
app.component("MenuComponent",MenuComponent);
app.component("Dropdown",Dropdown);

app.mount('#app')
