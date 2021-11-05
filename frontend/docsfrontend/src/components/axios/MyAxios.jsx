import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

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
        if (error.response.status === 401 && originalRequest.url === baseURL+'api/token/refresh/') {
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
  
                    // check expire date of refreshtoken
                    const now = Math.ceil(Date.now() / 1000);
                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post(baseURL + 'api/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
                            sessionStorage.setItem('token', "Bearer " + response.data.access);
                            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
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
      return Promise.reject(error);
  }
);

export default axiosInstance;