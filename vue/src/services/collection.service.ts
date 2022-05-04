import type { Lego } from "@/models/Lego";
import axios from "axios";

export class CollectionService {
  async getCollection(){
    const res = await axios.get("/api/lego/");
    return res.data;
  }

  async addToCollection(lego:Lego){
    const res = await axios.post<Lego>("/api/lego",lego);
    return res.data;
  }
}