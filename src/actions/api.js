import axios from "axios";

const baseUrl = "https://localhost:5001/api/"

// inside this object we can have different functions for different controllers inside the asp.net core
export default {

    // fetchAll is a function with no parameter that will perform api get on the url
    mc(url=baseUrl+'me/'){
        return  {
            fetchAll : () => axios.get(url),
            fetchById :id => axios.get(url+id),
            create : newRecord => axios.post(url,newRecord),
            update : (id,updatedRecord) =>axios.put( url + id, updatedRecord),
            delete: id => axios.delete(url + id )
        }
    }
}