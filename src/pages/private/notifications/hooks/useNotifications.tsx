import { useEffect, useState } from "react"

type Notifications<T> = {
     status : 'loading' | 'success' | 'error'
     data: T[]
}

// TODO: write this later

function useNotifications<T>(data: Promise<T[]>){
    const [notifications,setNotifications] = useState<Notifications<T>>({
        status: 'loading',
        data: []
    })
    useEffect(()=>{
        const load = async () => {
            try {
                const result = await data 
                setNotifications({
                    data: result,          
                    status: 'success'
                })
            } catch (error) {
                setNotifications(prev => ({
                    ...prev, 
                    status: 'error'
                }))
            }
        }

        load()
    },[])
    return { notifications }
}

export default useNotifications