import { useEffect, useState, type ChangeEvent } from "react"
import type { ChatMessage } from "../../../../services/chatService"

type ChatState = {
    status : 'loading'| 'success' | 'error',
    chats: ChatMessage[]
}

const defaultChatState : ChatState = {
    status: 'loading',
    chats: []
}

function useTeamChat(teamId : number){
    const [currentState, setCurrentState] = useState<ChatState>(defaultChatState)
    const [message, setMessage] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setMessage(value)
    }

    const handleSubmit = () => {
        // TODO
    }

    useEffect(()=> {
        const load = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            try {
                //
                setCurrentState(prev => ({...prev,status: 'success'}))
            } catch (error) {
            //
            }
        }

        load()
    })
    
    return {
        currentState,
        message,
        handleInput,
        handleSubmit
    }
}

export default useTeamChat