import LoadingSpinner from "../../../components/LoadingSpinner"
import { MessageCircleWarning } from "lucide-react"
import { ChatBoxHeader, ChatBoxBody } from "./ChatBox"
import ChatControls from "./ChatControls"
import useChatbot from "../hooks/useChatbot/hook"

function Chatbot(){
    const { currentState, message, handleInput, handleSubmit } = useChatbot()
    if(currentState.status === 'loading'){
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-full">
                <LoadingSpinner />
            </div>
        )
    }
    
    if(currentState.status === 'success'){
        return (
                <>
                <ChatBoxHeader>
                    <h3 className="text-white font-semibold">Team Chat</h3>
                </ChatBoxHeader>
                <ChatBoxBody>
                    {currentState.chats.length > 0 ? (
                        <></>
                    ):(
                        <>
                            <h1 className="font-bold">Your conversations will appear here</h1>
                            <p className="font-extralight">Start a new chat or select a conversation from the list.</p>
                        </>
                    )}
                </ChatBoxBody>
                <ChatControls onChange={handleInput} value={message} onClick={handleSubmit} />
                </> 
            )
      
    }

    if(currentState.status === 'error'){
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-full text-center">
                <MessageCircleWarning/>
                <h1 className="font-bold">Failed to load messages</h1>
                <p className="font-extralight">We couldn’t load your chats. Please check your connection and try again.</p>
            </div>
        )
    }
}

export default Chatbot