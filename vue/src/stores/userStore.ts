import { defineStore } from "pinia";
import type { User } from "../models/User";
import { UserService } from "../services/user.service";

const userService: UserService = new UserService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: { email: "" } as User,
  }),
  getters: {
    email: (state) => {
      if (state.loggedInUser.email != undefined) return state.loggedInUser.email;
      else return "";
    },
  },
  actions: {
    logout(){
      this.loggedInUser={ email:""} as User;
    },
    createUser(email: string, password: string) {
      return new Promise((resolve, reject) => {
        userService
          .createUser(email, password)
          .then((token) => {
            if(token.token) localStorage.setItem('token', token.token);
            localStorage.setItem('token_duration',JSON.stringify(Date.now()+1000*60*10));
            resolve(token);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    loginUser(email: string, password: string) {
      return new Promise((resolve, reject) => {
        userService
          .loginUser(email, password)
          .then((token) => {
            if(token.token) localStorage.setItem('token', token.token);
            localStorage.setItem('token_duration',JSON.stringify(Date.now()+1000*60*10));
            resolve(token);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getProfile(){
      return new Promise((resolve, reject) => {
        userService
            .getProfile()
            .then((profile:User) => {
              this.loggedInUser=profile;
              resolve(profile);
            })
            .catch((err) => {
              localStorage.removeItem("token");
              reject(err);
            });
      });
    }
  },
});