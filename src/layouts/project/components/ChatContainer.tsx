import useProjectLayout from "../hooks/useProjectLayout/hook";
import ChatBox, { ChatBoxBody, ChatBoxHeader } from "./ChatBox";
import TeamChat from "./TeamChat";
import Chatbot from "./Chatbot";
import ChatButton from "./ChatButton";
import { Bot, MessageCircle } from "lucide-react";

function ChatContainer() {
    const { toggleChat, setToggleChat, documentationSettings } = useProjectLayout();
    const { messages, sister } = documentationSettings
    return (
        <div className="flex flex-col items-end gap-4 fixed bottom-20 right-20 z-10 text-white">
            {(toggleChat.messages) && (
                <ChatBox>
                    <ChatBoxHeader>
                        <h3 className="text-white font-semibold">Team Chat</h3>
                    </ChatBoxHeader>
                    <ChatBoxBody>
                        <TeamChat/>
                    </ChatBoxBody>
                </ChatBox>
            )}

            {(toggleChat.chatbot) && (
                <ChatBox>
                    <ChatBoxHeader>
                        <h3 className="text-white font-semibold">S.I.S.t.e.r</h3>
                    </ChatBoxHeader>
                    <ChatBoxBody>
                        <Chatbot/>
                    </ChatBoxBody>
                </ChatBox>
            )}

            <div className="flex flex-row items-center justify-center gap-4">
                
                {messages && (<ChatButton name="messages" icon={MessageCircle} onClick={() => setToggleChat(prev => ({ chatbot: false, messages: !prev.messages }))}>
                    Messages
                </ChatButton>)}
                
                { sister && (<ChatButton icon={Bot} name="chatbot" onClick={() => setToggleChat(prev => ({ chatbot: !prev.chatbot, messages: false }))}>
                    help me S.I.S.t.e.r im stuck!    
                </ChatButton>)}
            </div>
        </div>
    );
}

export default ChatContainer