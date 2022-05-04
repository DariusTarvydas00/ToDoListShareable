<template>
  <div class="text-center mb-5">
      <img src="https://www.pngall.com/wp-content/uploads/5/Lego-Toy-PNG-Image-HD.png" alt="Image" height="200" class="mb-3">
  </div>
  <div class="grid">
    <div class="col-12 md:col-8 md:col-offset-2 lg:col-8 lg:col-offset-2">
      <div class="text-center mb-5">
          <div class="text-900 text-3xl font-medium mb-3">My Lego Collection</div>
          <span class="text-600 font-medium line-height-3">Don't have an account?</span>
          <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" v-on:click="signup">Create today!</a>
      </div>

      <div>
          <label for="email" class="block text-900 font-medium mb-2">Email</label>
          <InputText id="email" v-model="user.email" ref="email" type="email" class="form-control w-full mb-3" placeholder="Enter email" name="email" />

          <label for="password" class="block text-900 font-medium mb-2">Password</label>
          <InputText id="password" v-model="user.password" ref="password" type="password" class="form-control w-full mb-3" placeholder="Enter password" name="pwd" />

          <Button label="Sign In" icon="pi pi-user" class="w-full" v-on:click="login"></Button>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import Swal from 'sweetalert2';
import { UserStore } from "@/stores/userStore";

export default {
  data(){
    return{
      user:{
        email:"",
        password:""
      }
    }
  },
  methods:{
    signup(){
      this.$router.push({ name: 'Register' });
    },
    login(){
      if(this.checkValidation()){
        const userStore = UserStore();
        userStore.loginUser(this.user.email,this.user.password).then(response => {
          if(response){
            this.$router.push({name:"Home"});
          }else{
            Swal.fire("Error : Something went wrong.");
          }
        }).catch(error => {
          if (error.response) {
            Swal.fire(error.response.data);
          }else{
            Swal.fire("Error : Something went wrong.");
          }
        });
      }
    },
    checkValidation(){
      if(!this.user.email){
        this.$refs.email.$el.focus();
        Swal.fire("Give email !");
        return;
      }
      if(!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(this.user.email)){
        this.$refs.email.$el.focus();
        Swal.fire("Invalid email !");
        return;
      }
      if(!this.user.password){
        this.$refs.password.$el.focus();
        Swal.fire("Give password");
        return;
      }
      return true;
    }
  }
}
</script>

<style scoped>
.container{
  max-width: 360px;
}
button:hover {
  opacity:1;
}
.signin, .signup {
  float: left;
  width: 50%;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>