import axiosInstance from "./MyAxios";


export default async function postDataWithAxios(url, postData, token = null, funky, funkyFail=null){
   axiosInstance.post(url, postData)
    .then(function (response) {
      var data = response.data;
        funky(data);
    })
    .catch(function (error) {
        console.log(error)
    });
}