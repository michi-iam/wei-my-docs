import axios from "axios";


export default async function getDataWithAxios(url, funky){

    await axios.get(url)
    .then(res => {
        var data = res.data;
        funky(data)
    });
   
}



