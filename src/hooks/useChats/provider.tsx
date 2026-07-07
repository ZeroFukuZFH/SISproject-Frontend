import { useEffect, type ReactNode, useState } from "react"
import { Client } from "@stomp/stompjs";
import { ChatsContext } from "./context";

function ChatsProvider({children}:{ children : ReactNode }){
    const [stompClient, setStompClient] = useState<Client | null>(null)

    useEffect(()=>{
        const client = new Client({
            brokerURL: import.meta.env.VITE_APP_WS_URL,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected Successfully!");
                
            },
            onDisconnect: () => {
                console.log("Disconnected.");
            },
            onStompError: (frame) => {
                console.error("Broker error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
            }
        });

        client.activate();
        const load = () => setStompClient(client)
        load()

        return () => {
            client.deactivate();
        };
    },[])

    const handleSendMessage = (currentTeamId: number, sender: string,message: string) => {
        if(!stompClient) return
        stompClient.publish({
            destination: `/app/team/chat/send/${currentTeamId}`,
            body: JSON.stringify({
                content: message,
                sender: sender
            })
        })
    }

    const handleDisconnect = async () => {
        if (stompClient) {
            await stompClient.deactivate();
            setStompClient(null);   
            console.log("STOMP connection terminated cleanly.");
        }
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