import { useEffect, useState } from "react"

type ChatState = {
    status : 'loading'| 'success' | 'error',
    chats: any[]
}

const defaultChatState : ChatState = {
    status: 'loading',
    chats: []
}

function useTeamChat(teamId: string){
    const [currentState, setCurrentState] = useState<ChatState>(defaultChatState)
    
    useEffect(()=> {
        const load = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            try {
                //
                const fetchedChats: any[] = []
                
                if(fetchedChats){
                    setCurrentState({status:'success',chats:fetchedChats})
                }
            } catch (error) {
            //
            }
        }

        load()
    })
    
    return {
        currentState
    }
}

export default useTeamChat