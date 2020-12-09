import { useReducer } from "react";
import axios from 'axios';
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import AuthToken from './TokenAuth';
import {
    REGISTER_USER,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT,
    REGISTRATION_FAILED,
    LOGIN_FAILED
} from "../image/action";

const AuthState = (props) => {
    const initialState={
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user:null,
        loading: true,
        error:null
         
    }
   const [state,dispatch]=useReducer(AuthReducer,initialState);
   // load useraccount

   const loadUser=async()=>{
       if(localStorage.token){
           AuthToken(localStorage.token);
       }
       try {
           const res=await axios.get('/api/login')
           dispatch({
               type:LOAD_USER,
               payload:res.data
           })
           loadUser();
       } catch (error) {
           console.log(error);
       }
   }
    // Register user
    const registeruser=async formData=>{
        const config={
            headers:{
               'Content-Type':'application/json'
            }
        }
        try {
            const res=await axios.post('/api/users',formData,config);
            dispatch({
                type:REGISTER_USER,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:REGISTRATION_FAILED,
                payload:error.resposne.data.msg
            })
        }
    }

    const loginuser=async formData=>{
        const config={
            headers:{
               'Content-Type':'application/json'
            }
        }
        try {
            const res=await axios.post('/api/auth',formData,config);
            dispatch({
                type:LOGIN_USER,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:LOGIN_FAILED,
                payload:error.resposne.data.msg
            })
        }
    }
    const logout= ()=>{
        dispatch({type:LOGOUT});
    }


   return(
       <AuthContext.Provider value={{
           token:state.token,
           isAuthenticated:state.isAuthenticated,
           loading:state.loading,
           user:state.user,
           error:state.error,
           registeruser,
           loadUser,
           loginuser,
           logout
       }}>
        {props.children}   
       </AuthContext.Provider>
   );
};
export default AuthState;