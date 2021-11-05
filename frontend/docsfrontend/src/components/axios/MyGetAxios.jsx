import axiosInstance from "./MyAxios";



export default async function getDataWithAxios(url, funky){
    axiosInstance.get(url)
    .then(response => {
        var data = response.data;
        funky(data)
    }).catch(function (error) {
        console.log(error)
    });
}



