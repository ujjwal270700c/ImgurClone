import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT,
    REGISTRATION_FAILED,
    LOGIN_FAILED,
    LOAD_USER
} from "../image/action";

export default (state,action)=>{
    switch(action.type){

        
        case REGISTER_USER:
        case LOGIN_USER:    
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false
            };
            case REGISTRATION_FAILED:
            case LOGIN_FAILED:  
            case LOGOUT:  
                localStorage.removeItem('token');
                return{
                    ...state,
                    token:null,
                    isAuthenticated:false,
                    loading:false,
                    user:null,
                    error:action.payload
                };
                case LOAD_USER:
                return{
                    ...state,
                    isAuthenticated:false,
                    loading:false,
                    user:action.payload,
                };
                
               

         default:
             return{
                ...state
             }
           
         
         
    }
}