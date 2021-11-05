import axiosInstance from "./MyAxios";


export default async function postDataWithAxios(url, postData, token = null, funky, funkyFail=null){
   if(token){
    //axiosInstance.defaults.headers.common["Authorization"] = token 
   }
   axiosInstance.post(url, postData)
    .then(function (response) {
      var data = response.data;
        funky(data);
    })
    .catch(function (error) {

    });
   
}





// const axiosInstance = axios.create({
//     headers: {
//         'Authorization': sessionStorage.getItem('token'),
//         }
// });

// const baseURL = process.env.REACT_APP_BASE_URL;
// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         const originalRequest = error.config;

//         // abort (infinite)
//         if (error.response.status === 401 && originalRequest.url === baseURL+'api/token/refresh/') {
//             console.log("POST AXIOS")
//             console.log("INFINTE STOPPER")
//             window.location.href = '/login/';
//             return Promise.reject(error);
//         }

//         if (error.response.data.code === "token_not_valid" &&
//             error.response.status === 401 && 
//             error.response.statusText === "Unauthorized") 
//             {
//                 const refreshToken = sessionStorage.getItem('refreshtoken');
//                 if (refreshToken){
//                     const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
//                     //const tokenParts = JSON.parse(refreshToken.split('.')[1]);

//                     // exp date in token is expressed in seconds, while now() returns milliseconds:
//                     const now = Math.ceil(Date.now() / 1000);
//                     console.log(tokenParts.exp);

//                     if (tokenParts.exp > now) {
//                         return axiosInstance
//                         .post(baseURL + 'api/token/refresh/', {refresh: refreshToken})
//                         .then((response) => {
//                             console.log("RESP ON SE")
//                             console.log(response)
//                             console.log(response.data)
//                             sessionStorage.setItem('token', "Bearer " + response.data.access);
//                             //sessionStorage.setItem('refreshtoken', response.data.refresh);
            
//                             axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
//                             originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
            
//                             return axiosInstance(originalRequest);
//                         })
//                         .catch(err => {
//                             console.log("ERROR 1 POST")
//                             console.log(err)
//                             console.log(window.location.href)
//                             console.log(window.location.href + "/login/")
//                             window.location.href = '/login/';
//                         });
//                     }else{
//                         console.log("Refresh token is expired", tokenParts.exp, now);
//                         window.location.href = '/login/';
//                     }
//                 }else{
//                     console.log("Refresh token not available.")
//                     window.location.href = '/login/';
//                 }
//         }
      
     
//       // specific error handling done elsewhere
//       return Promise.reject(error);
//   }
// );