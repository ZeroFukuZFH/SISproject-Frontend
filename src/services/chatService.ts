import { API_BASE_URL } from "../utils/http"
import { HttpError } from "../utils/http"

export type ChatMessage = {
    sender: string,
    message: string
}

export const chatService = {
    getAllTeamRooms: async () => {
        const response = await fetch(API_BASE_URL + "/api/teams/all",{
                headers: { 'Content-Type': 'application/json'},
                method:"GET",
                credentials:'include'
            })
        if(!response.ok){
            throw new HttpError(response.status,response.statusText);
        }

        const data = await response.json()
        return data
    }
}

