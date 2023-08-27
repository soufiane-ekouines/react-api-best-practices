import axios from "axios";

const axiocClient = axios.create({
    baseURL:"http://127.0.0.1:8000/api",

})

axiocClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = 'Bearer '+token;
    return config
})

axiocClient.interceptors.response.use((response)=>{
 return response
},(error)=>{
    const {response} = error;
    if(response.status == 401)
    {
        localStorage.removeItem('ACCESS_TOKEN');
   }
   throw error;
})

export default axiocClient