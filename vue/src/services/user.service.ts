import axios from "axios";

export class UserService {
  async createUser(email: string, password:string){
    const res = await axios.post("api/auth/RegisterUser", {
      email: email,
      password: password,
    });
    return res.data;
  }
  async loginUser(email:string, password:string){
    const res = await axios.post("api/auth/Login", {
      email: email,
      password: password,
    });
    return res.data;
  }
  async getProfile(){
    const res = await axios.get("api/auth/GetProfile");
    return res.data;
  }
}