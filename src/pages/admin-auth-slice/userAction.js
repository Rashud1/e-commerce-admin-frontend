import {requestPending, responseSuccess, loginSuccess,
     loginFail, userLogOutSuccess,
      requestFail, loginAuto, autoLoginPending, resetPassResponse, profileUpdateSuccess,resetForgetPassword, passwordUpdateSuccess } from "./userSlice";
import { createUser, loginUser, verifyNewUser, logoutUser, getUser, updateUserProfile, updateUserPassword } from "../../api/userAPI.js";
import { getNewAccessJWT, updateNewAccessJWT, requestOtp } from "../../api/tokenAPI";


export const userRegister = newUser => async dispatch =>{
console.log(newUser);
dispatch(requestPending());

//call api 

const result = await createUser(newUser);
console.log(result, "from user action");

result?.status === "success" ? dispatch(responseSuccess()) :dispatch(requestFail(result));

//dispatch response
};


export const userEmailVerification = userObj => async dispatch =>{
   


dispatch(requestPending());

//call api 

const result = await verifyNewUser(userObj);
console.log(result, "from user action");

result?.status === "success" ? 
dispatch(responseSuccess(result))
:dispatch(requestFail(result));

//dispatch response
};

const setJWTinBrowserMemory = ({accessJWT, refreshJWT}) => {
    window.sessionStorage.setItem('accessJWT' , accessJWT)
    window.localStorage.setItem('refreshJWT', refreshJWT)
}

export const adminLogin = loginInfo => async (dispatch) => {
    dispatch(requestPending());

    //call api log in

    const result = await loginUser(loginInfo);
    

    if (result?.status === "success"){
        setJWTinBrowserMemory(result.jwts)
        return dispatch(loginSuccess(result.user));
    }
    dispatch(loginFail(result));
}
export const autoLogin = () => async dispatch =>{
    dispatch(autoLoginPending(true))
    const accessJWT = window.sessionStorage.getItem("accessJWT");
    const refreshJWT = window.localStorage.getItem("refreshJWT");

    //1. access JWT exist
if(accessJWT){
    return dispatch(loginAuto());
}
//2. access JWT does not exist but refreshJWT exists
if(!accessJWT && refreshJWT){
    //call api to get refreshJWTtoken
    const result = await getNewAccessJWT();
    if(result?.accessJWT){
        window.sessionStorage.setItem("accessJWT", result?.accessJWT);
        return dispatch(loginAuto());
    }
    dispatch(userLogOut());
}
    

   
    
}

export const userLogOut = () => async dispatch =>{
    const accessJWT = window.sessionStorage.getItem("accessJWT")
    const refreshJWT = window.localStorage.getItem("refreshJWT")
     await logoutUser({accessJWT, refreshJWT})
    window.sessionStorage.removwItem("accessJWT");
    window.localStorage.removeItem("refreshJWT");
    dispatch(loginAuto(userLogOutSuccess()));
}

export const fetchUser = () => async dispatch =>{
dispatch(requestPending())

    const data = await getUser();
    if(data?.message === "jwt expired"){
        //request for new accessJWT
        const token = await updateNewAccessJWT()
        if(token){
            return dispatch(fetchUser())
    
        }else{
           dispatch(userLogOut())
        }
        //then re call the function to refetch it.
    }

    if(data?.user){
         return dispatch(loginSuccess(data?.user))
    }
    dispatch(requestFail(data));
}

export const updateProfileUser = (userInfo) => async dispatch =>{
    dispatch(requestPending())
    
        const data = await updateUserProfile(userInfo);
        if(data?.message === "jwt expired"){
            //request for new accessJWT
            const token = await updateNewAccessJWT()
            if(token){
                return dispatch(updateProfileUser(userInfo))
        
            }else{
               dispatch(userLogOut())
            }
            //then re call the function to refetch it.
        }
    
        
             dispatch(profileUpdateSuccess(data))
        }
export const updatePasswordUser = passInfo => async dispatch =>{
    dispatch(requestPending())
    
        const data = await updateUserPassword(passInfo);
        if(data?.message === "jwt expired"){
            //request for new accessJWT
            const token = await updateNewAccessJWT()
            if(token){
                return dispatch(updatePasswordUser(passInfo))
        
            }else{
               dispatch(userLogOut())
            }
            //then re call the function to refetch it.
        }
    
        
             dispatch(passwordUpdateSuccess(data))
        }
 export const requestPassResetOtp = email => async dispatch =>{
 dispatch(requestPending())
            
const data = await requestOtp(email)
    
dispatch(resetPassResponse({data, email}))
 }
 export const resetPassword = passObj => async dispatch =>{
 dispatch(requestPending())
            
const data = await resetForgetPassword(passObj)
    
dispatch(resetPassResponse({data}))
 }
              
            
    