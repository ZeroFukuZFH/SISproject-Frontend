import { useEffect, useState } from "react"
import type { ChatMessage } from "../../../../services/chatService"

type ChatState = {
    status : 'loading'| 'success' | 'error',
    chats: ChatMessage[]
}

const defaultChatState : ChatState = {
    status: 'loading',
    chats: []
}

function useTeamChat(){
    // TODO: teamId must be from current params
    const [currentState, setCurrentState] = useState<ChatState>(defaultChatState)
    
    useEffect(()=> {
        const load = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            try {
                //
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