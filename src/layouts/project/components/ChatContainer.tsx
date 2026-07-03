import useProjectLayout from "../hooks/useProjectLayout/hook";
import ChatBox from "./ChatBox";
import TeamChat from "./TeamChat";
import Chatbot from "./Chatbot";
import ChatButton from "./ChatButton";
import { Bot, MessageCircle } from "lucide-react";

function ChatContainer() {
    const { toggleChat, setToggleChat } = useProjectLayout();
    return (
        <div className="flex flex-col items-end gap-4 fixed bottom-20 right-20 z-10 text-white">
            {(toggleChat.messages) && (
                <ChatBox>
                    <TeamChat/>
                </ChatBox>
            )}

            {(toggleChat.chatbot) && (
                <ChatBox>
                    <Chatbot/>
                </ChatBox>
            )}

            <div className="flex flex-row items-center justify-center gap-4">
                
                <ChatButton name="messages" icon={MessageCircle} onClick={() => setToggleChat(prev => ({ chatbot: false, messages: !prev.messages }))}>
                    Messages
                </ChatButton>
                
                <ChatButton icon={Bot} name="chatbot" onClick={() => setToggleChat(prev => ({ chatbot: !prev.chatbot, messages: false }))}>
                    help me S.I.S.t.e.r im stuck!    
                </ChatButton>
            </div>
        </div>
    );
}

export default ChatContainer