
import { useEffect, useState, type ChangeEvent } from "react"
import landingService from "../../../../services/landingService"


function useProfilePopup(){

    const [currentUser,setCurrentUser] = useState({
        username: '',
        email: '',
        activityStatus: 'offline'
    })
    useEffect(()=>{
        const load = async () => {
            const response = await landingService.me()
            setCurrentUser({...response})
        }   
        load()

        // TODO: handle errors later
    },[])

    const handleStatusChange = (e : ChangeEvent<HTMLButtonElement>) => { 
        const { name } = e.target;
        // TODO: fix bugs and allow database update
        setCurrentUser(prev => ({...prev,activityStatus:name}))
    }   

    return {
        currentUser,
        handleStatusChange,
    }
}

export default useProfilePopup