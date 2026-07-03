import useAuth from "../../../../hooks/useAuth/hook"
import { useState, type ChangeEvent } from "react"

function useProfilePopup(){
    const { auth } = useAuth()
    const { email, username } = auth
    const [signOut, setSignOut] = useState(false)
    const [activityStatus, setActivityStatus] = useState('available') // TODO: add as response type later ( 'available' | 'away' | 'do not disturb' | 'offline' )
    const handleStatusChange = (e : ChangeEvent<HTMLButtonElement>) => { 
        const { name } = e.target;
        setActivityStatus(name)
    }
    const handleSignOut = () => {
        setSignOut(prev => !prev)
    }
    
    return {
        email,
        username,
        activityStatus,
        handleStatusChange,
        signOut,
        handleSignOut,
    }
}

export default useProfilePopup