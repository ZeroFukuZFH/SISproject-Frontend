import { useState, type ReactNode } from "react";
import { AuthContext } from "./context";
import type { AuthResponse } from "./type";

function AuthProvider({ children }:{ children: ReactNode}){
    const [auth,setAuth] = useState<AuthResponse>({
        username:"",
        email:"",
        accessToken:"",
        refreshToken:""
    })
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider