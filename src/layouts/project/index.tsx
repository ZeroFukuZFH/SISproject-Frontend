import { Bot, ChevronDown, MessageCircle, MessageCircleWarning, SendHorizonal, X, type LucideIcon } from "lucide-react";
import { Outlet } from "react-router";
import useProjectLayout from "./hooks/useProjectLayout/hook";
import ProjectLayoutProvider from "./hooks/useProjectLayout/provider";
import { defaultChatState } from "./hooks/useProjectLayout/types";
import { type ButtonHTMLAttributes } from "react";
import useTeamChat from "./hooks/useTeamChat/hook";

function ProjectLayout() {
    return (
        <main>
            <ProjectLayoutProvider>
                <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#17161D]">
                    <Outlet />

                    <div className="flex flex-row items-center justify-center gap-4 fixed bottom-20 left-20 z-10">
                        <DocumentationSettings />
                    </div>

                    <Chats />
                </div>
            </ProjectLayoutProvider>
        </main>
    );
}

function NavigationBar(){
    return (<></>)
}


function Chats() {
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

function Chatbot(){
    return (
        <></>
    )
}

function TeamChat(){
    const { currentState } = useTeamChat('') // TODO: use slug 
    if(currentState.status === 'loading'){
        return (
            <div className="flex flex-col gap-2 justify-center items-center h-full">
                <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24">
                    <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900">
                    </path>
                </svg>
            </div>
        )
    }
    

    if(currentState.status === 'success'){
        if(currentState.chats.length === 0){
            return (
                <div className="flex flex-col gap-2 justify-center items-center h-full">
                    <h1 className="text-bold">Your conversations will appear here</h1>
                    <p>Start a new chat or select a conversation from the list.</p>
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
            <div className="flex flex-col gap-2 justify-center items-center h-full">
                <MessageCircleWarning/>
                <h1 className="text-bold">Failed to load messages</h1>
                <p>We couldn’t load your chats. Please check your connection and try again.</p>
            </div>
        )
    }
}

function ChatBox({ children }: { children?: React.ReactNode }) {
    const { setToggleChat } = useProjectLayout();

    return (
        <div className="rounded-2xl border border-[#645D68] w-[400px] h-[500px] flex flex-col overflow-hidden bg-[#17161D]">
            {/* Header */}
            <div className="flex p-4 justify-between items-center bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] rounded-t-2xl border-b border-[#645D68]">
                <h3 className="text-white font-semibold">Team Chat</h3>
                <button className="cursor-pointer hover:opacity-80 transition" onClick={() => setToggleChat(defaultChatState)}>
                    <X size={20} color="white" />
                </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {children}
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-[#645D68]">
                <div className="flex flex-row gap-2 items-center">
                    <input 
                        type="text" 
                        placeholder="Start Typing..." 
                        className="flex-1 bg-white/5 border border-[#645D68] outline-none rounded-full px-4 py-2 text-white placeholder-white/40 focus:border-purple-500 transition"
                    />
                    <button className="cursor-pointer p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition">
                        <SendHorizonal size={20} color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function DocumentationSettings() {
    return (
        <div className="p-6 rounded-2xl flex flex-col gap-4 border border-[#645D68] text-white max-w-60">
            <div className="flex flex-row gap-2 items-center justify-center">
                <h1 className="text-xl font-bold mb-4">Documentation Settings</h1>
                <button>
                    <ChevronDown />
                </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span>enable "on this page"</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span>enable S.I.S.t.e.r</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span>enable Messages</span>
            </label>
        </div>
    );
}

interface ChatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: LucideIcon
}

function ChatButton({ icon: Icon, ...props }: ChatButtonProps) {

    return (
        <button
            {...props}
            className={`flex flex-row gap-2 justify-center items-center text-white p-4 rounded-2xl bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] cursor-pointer hover:scale-105 transition-all duration-300 group w-fit ${props.className || ''}`}
        >
            {Icon && <Icon size={40} color="white" />}
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
                {props.children}
            </span>
        </button>
    );
}

export default ProjectLayout;