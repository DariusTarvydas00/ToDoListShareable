//import { ref, onMounted, onUnmounted } from 'vue'
import router from "@/router";
import { UserStore } from "@/stores/userStore";

// by convention, composable function names start with "use"
export function logout() {
    const token= localStorage.getItem('token');
    if(!token) return false;
    const userStore = UserStore();
    localStorage.removeItem("token");
    userStore.logout();
    router.push("/login");
    return true;
}