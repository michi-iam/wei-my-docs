import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
console.log("baseURL get 1")
console.log(baseURL)

const axiosInstance = axios.create({
    headers: {
        'Authorization': sessionStorage.getItem('token'),
        }
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // abort (infinite)
        console.log("AXIOS GET")
        console.log(originalRequest.url)
        console.log(baseURL+'api/token/refresh/')
        if (error.response.status === 401 && originalRequest.url === baseURL+'api/token/refresh/') {
            console.log("infinite loop stopper")
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.status === 401 && 
            error.response.data.code === "token_not_valid" &&
            error.response.statusText === "Unauthorized") 
            {
                const refreshToken = sessionStorage.getItem('refreshtoken');
                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                    //const tokenParts = JSON.parse(refreshToken.split('.')[1]);

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post(baseURL + 'api/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
                            console.log("RESP ON SE")
                            console.log(response)
                            console.log(response.data)
                            sessionStorage.setItem('token', "Bearer " + response.data.access);
                            //sessionStorage.setItem('refreshtoken', response.data.refresh);
            
                            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
            
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log("ERROR 1")
                            console.log(err)
                            window.location.href = '/login/';
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                }else{
                    console.log("Refresh token not available.")
                    window.location.href = '/login/';
                }
        }
      
     
      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);

export default axiosInstance;