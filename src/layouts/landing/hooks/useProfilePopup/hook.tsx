
import { useEffect, useState, type ChangeEvent } from "react"
import landingService from "../../../../services/landingService"


function useProfilePopup(){

    const [currentUser,setCurrentUser] = useState({
        username: '',
        email: '',
        activityStatus: 'offline'
    })

    const [signOut, setSignOut] = useState(false) // TODO: change later, add actual signout functionality on backend too

    useEffect(()=>{
        const load = async () => {
            const response = await landingService.me()
            setCurrentUser({...response})
            console.log(response)
        }   
        load()

        // TODO: handle errors later
    },[])

    const handleStatusChange = (e : ChangeEvent<HTMLButtonElement>) => { 
        const { name } = e.target;
        // TODO: fix bugs and allow database update
        setCurrentUser(prev => ({...prev,activityStatus:name}))
    }
    const handleSignOut = () => {
        setSignOut(prev => !prev)
    }
    
    return {
        currentUser,
        handleStatusChange,
        signOut,
        handleSignOut,
    }
}

export default useProfilePopup