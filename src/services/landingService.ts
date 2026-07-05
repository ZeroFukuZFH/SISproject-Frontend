import { API_BASE_URL } from "../utils/http"
import { HttpError } from "../utils/http"

const landingService = {
    logout: async ():Promise<LogoutResponse> => {
        const response = await fetch(API_BASE_URL + "/api/auth/logout",{
            headers: { 'Content-Type': 'application/json'},
            method:"POST",
            credentials:'include'
        })
                
        if(!response.ok){
            throw new HttpError(response.status,"Unable to Logout")
        }
        const data = await response.json() as LogoutResponse
        return data
    },
    me: async ():Promise<MeResponse> => {
        const response = await fetch(API_BASE_URL + "/api/auth/me",{
            headers: { 'Content-Type': 'application/json'},
            method:"GET",
            credentials:'include'
        })
                
        if(!response.ok){
            throw new HttpError(response.status,"Failed to get user info")
        }
        const data = await response.json() as MeResponse
        return data
    },
} 

export default landingService

type LogoutResponse = {
    status: string
}

type MeResponse = {
    username: string,
    email: string,
    activityStatus: 'available' | 'away' | 'do not disturb' | 'offline'
}

