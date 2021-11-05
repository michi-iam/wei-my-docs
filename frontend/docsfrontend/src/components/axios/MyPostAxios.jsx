import axios from "axios";


export default async function postDataWithAxios(url, postData, token = null, funky, funkyFail=null){

 
   if(token){
       axios.defaults.headers.common["Authorization"] = token 
   }
    axios.post(url, postData)
    .then(function (response) {
      var data = response.data;
        funky(data);

    })
    .catch(function (error) {
        if(funkyFail){
            funkyFail()
        }
   
      
    });
   
}



