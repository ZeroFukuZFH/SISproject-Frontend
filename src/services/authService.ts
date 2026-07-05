import { API_BASE_URL, HttpError } from "../utils/http"

export const authService = {
    login: async function(loginRequest: LoginRequest):Promise<AuthResponse> {
        const response = await fetch(API_BASE_URL + "/api/auth/login",{
            headers: { 'Content-Type': 'application/json'},
            method:"POST",
            body: JSON.stringify(loginRequest),
            credentials:'include'
        })
        
        if(!response.ok){
            throw new HttpError(response.status,"Account does not exist!")
        }
        const data = await response.json() as AuthResponse
        return data
    },

    register: async function(registerRequest: RegisterRequest):Promise<AuthResponse> {
        const response = await fetch(API_BASE_URL + "/api/auth/register",{
            headers: { 'Content-Type': 'application/json'},
            method:"POST",
            body: JSON.stringify(registerRequest),
            credentials:'include'
        })
        
        if(!response.ok){
            throw new HttpError(response.status,"Account Already Exists!")
        }
        const data = await response.json() as AuthResponse
        return data
    },
}

// TODO: cleanup later

type LoginRequest = {
    email: string, 
    password: string
}

type RegisterRequest = {
    username: string,
    email: string,
    password: string
}

export type AuthResponse = {
    message: string
}