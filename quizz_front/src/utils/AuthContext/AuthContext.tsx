import { createContext } from "react";
import { useAppSelector , useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import {type UserState} from '../../features/userLogique/userCridentials'
import { useUpdateUserTokenMutation } from "../../features/userLogique/signUp";
import { userGetUser } from "../../features/userLogique/userCridentials";
import { logOut } from "../../features/userLogique/userCridentials";
interface AuthContextType {
    user: UserState ; 
  }

const authContextData : AuthContextType = {
    user: {    
        id:-1,
        first_name: "",
        email : "",
        profile_picture: "",
        exist: false},
}  
const AuthContext = createContext(authContextData);
export default AuthContext ;


export const AuthProvider = ({ children }: { children: React.ReactNode}) => { 
    const [updateToken] = useUpdateUserTokenMutation() ;
    const dispatch = useAppDispatch() ; 
    dispatch(userGetUser())
    const authContextData : AuthContextType = {
        user: useAppSelector((state)=> state.user)  ,
    } 
    useEffect(()=>{
        const fourMinutes = 2000* 60 * 1;
        const interval =  setInterval(()=> {
            if(authContextData.user.exist){
                updateToken({refresh:JSON.parse(localStorage.getItem('authTokens')|| "").refresh}).unwrap().then((payload)=>(localStorage.setItem('authTokens',JSON.stringify(payload)))).catch(() => logOut())
            }
        },fourMinutes)
        return ()=> clearInterval(interval)

    })
    return(
        <AuthContext.Provider value={authContextData  }>
            {children}
        </AuthContext.Provider>
    )
}

