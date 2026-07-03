import useTeamChat from "../hooks/useTeamChat/hook"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { MessageCircleWarning } from "lucide-react"

function TeamChat(){
    const { currentState } = useTeamChat('') // TODO: use slug 
    if(currentState.status === 'loading'){
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-full">
                <LoadingSpinner />
            </div>
        )
    }
    

    if(currentState.status === 'success'){
        if(currentState.chats.length === 0){
            return (
                <div className="flex flex-col gap-2 justify-center items-center h-full text-center">
                    <h1 className="font-bold">Your conversations will appear here</h1>
                    <p className="font-extralight">Start a new chat or select a conversation from the list.</p>
                </div>
            )
        } else {
            return (
                <>{/* TODO: implement display chats here */}</> 
            )
        }
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

export default TeamChat