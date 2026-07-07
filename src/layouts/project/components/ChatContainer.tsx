import useProjectLayout from "../hooks/useProjectLayout/hook";
import ChatBox, { ChatBoxBody, ChatBoxHeader } from "./ChatBox";
import TeamChat from "./TeamChat";
import Chatbot from "./Chatbot";
import ChatButton from "./ChatButton";
import { Bot, MessageCircle } from "lucide-react";
import ChatControls from "./ChatControls";
import useChats from "../../../hooks/useChats/hook";
import { useState, type ChangeEvent } from "react";

function ChatContainer() {
    const { toggleChat, setToggleChat, documentationSettings } = useProjectLayout();
    const { messages, sister } = documentationSettings

    return (
        <div className="flex flex-col items-end gap-4 fixed bottom-20 right-20 z-10 text-white">
            {(toggleChat.messages) && (
                <CurrentTeamChat/>
            )}

            {(toggleChat.chatbot) && (
                <SisterChatBot/>
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
function CurrentTeamChat() {
  const { handleSendMessage } = useChats()
  const [message, setMessage] = useState("")

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = () => {
    handleSendMessage(1, "albert", message) // TODO: FIX
  }

  return (
    <ChatBox>
      <ChatBoxHeader>
        <h3 className="text-white font-semibold">Team Chat</h3>
      </ChatBoxHeader>
      <ChatBoxBody>
        <TeamChat />
      </ChatBoxBody>
      <ChatControls onChange={handleInput} value={message} onClick={handleSubmit} />
    </ChatBox>
  )
}

function SisterChatBot() {
  const [message, setMessage] = useState("")

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = () => {
    // TODO
  }

  return (
    <ChatBox>
      <ChatBoxHeader>
        <h3 className="text-white font-semibold">S.I.S.t.e.r</h3>
      </ChatBoxHeader>
      <ChatBoxBody>
        <Chatbot />
      </ChatBoxBody>
      <ChatControls onChange={handleInput} value={message} onClick={handleSubmit} />
    </ChatBox>
  )
}
export default ChatContainer