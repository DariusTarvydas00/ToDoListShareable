import axios from "axios";

export class RebrickableService {
  async searchSets(query:string){
    const res = await axios.get("https://rebrickable.com/api/v3/lego/sets/?search="+query+"&key=b42332f818dc05421ac78abb03a23690");
    return res.data;
  }
}