import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    isLoggedIn: false,
    isPending: false,
    userRegisterResponse: {},
    userLogOutsuccess: {},
    userLoginResp: {},
    userUpdateResp: {},
    isAutologinPending: false,
    showResetPasswordForm: false,
    resetPasswordRequestResponse:{},
    passwordResettingEmail: ""

};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        requestPending: (state)=>{
            state.isPending = true;
        },
        responseSuccess: (state, {payload})=>{
            console.log(payload, "from slice");
            state.isPending = false;
            state.userRegisterResponse = payload || {};

        },
        loginSuccess: (state, {payload}) => {
            state.userInfo = payload;
            state.userLoginResp = {};
            state.isLoggedIn = false;
            state.isPending = false;
        },
        profileUpdateSuccess: (state, {payload}) => {
            state.userUpdateResp = payload;
            
            state.isPending = false;
        },
        passwordUpdateSuccess: (state, {payload}) => {
            state.userUpdateResp = payload;
            state.isPending = false;
        },
        userLogOutSuccess: state =>{
            state.userRegisterResponseuserInfo= {};
            state.isLoggedIn= false;
            state.isAutologinPending=false;
        }, loginFail: (state, {payload}) => {
            state.isPending = payload;
            state.userRegisterResponse = payload || {};

        },
        loginAuto:(state)=> {
            state.isLoggedIn = true;
            state.isAutologinPending = false;
        },
       
        
        autoLoginPending: (state, {payload}) => {
            state.isAutologinPending= payload;
        },
        switchloginResetPassForm : (state)=>{
            state.showResetPasswordForm = !state.showResetPasswordForm
        },
        resetPassResponse: (state, {payload}) =>{
            console.log(payload)
            state.isPending = false
            state.resetPasswordRequestResponse = payload.data
            state.showResetPasswordForm = payload.data.status === "success"
            state.passwordResettingEmail= payload.email
        },
        requestFail: (state, { payload })=>{
            state.isPending = false
            state.userRegisterResponse = payload || {};
        },
    },
});

const {reducer, actions} = userSlice;

export const {requestPending,
             responseSuccess,
               loginSuccess,
                loginFail,
                loginAuto,
              requestFail,
              autoLoginPending,
              userLogOutSuccess,
               profileUpdateSuccess,
            passwordUpdateSuccess,
        switchloginResetPassForm,
    resetPasswordRequestResponse,
resetForgetPassword,
resetPassResponse}  = actions;


export default reducer;