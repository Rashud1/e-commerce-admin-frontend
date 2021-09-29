import axios from 'axios'

const rootUrl =
process.env.NODE_ENV === "production"
? process.env.ROOT_URL:"http://localhost:8000/api/v1";

const tokenApi = rootUrl + "/token";



 export const getNewAccessJWT = () =>{
    try {
        const {data} = axios.get(tokenApi, {
            headers: {
                Authorization: window.localStorage.getItem("refreshJWT"),
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        
    }
}


export const updateNewAccessJWT = async () =>{
    try {
        window.sessionStorage.removeItem("accessJWT")
        const {accessJWT} = await getNewAccessJWT()
        if(accessJWT){
            window.sessionStorage.setItem("accessJWT", accessJWT)
        }
        return window.sessionStorage.getItem("accessJWT")
    } catch (error) {
        return false
        
    }
}