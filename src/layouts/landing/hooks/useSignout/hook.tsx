import { useState } from "react"
import { useNavigate } from "react-router"
import landingService from "../../../../services/landingService"
import { HttpError } from "../../../../utils/http"

type SignOutState = 'loading' | 'error' | 'idle'

function useSignOut(){
    const navigate = useNavigate()
    const [state,setState] = useState<SignOutState>('idle')
    const handleSignOut = async () => {
        try {
            setState('loading')
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await landingService.logout()
            navigate("/login")
        } catch (error : unknown){
            if(error instanceof HttpError){
                setState('error')
            }
        }
    }

    return {
        state,
        handleSignOut
    }
}

export default useSignOut