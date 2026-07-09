import { useEffect,useState, type ReactNode} from "react"
import { ChatsContext } from "./context";

function ChatsProvider({children}:{ children : ReactNode }){
    const [messages, setMessage] = useState([])

    const handleSendMessage = (currentTeamId: number, sender: string,message: string) => {
        
    }

    const handleDisconnect = async () => {
       
    }
    
    return (
        <ChatsContext.Provider value={{
            handleDisconnect,
            handleSendMessage,

        }}>
            {children}
        </ChatsContext.Provider>
    )
}

export default ChatsProvider