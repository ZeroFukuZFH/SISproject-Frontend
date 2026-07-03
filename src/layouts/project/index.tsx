import { Bot, ChevronDown, MessageCircle, SendHorizonal, X } from "lucide-react";
import { Outlet } from "react-router";
import useProjectLayout from "./hooks/useProjectLayout/hook";
import ProjectLayoutProvider from "./hooks/useProjectLayout/provider";
import { defaultChatState } from "./hooks/useProjectLayout/types";

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

function Chats() {
    const { toggleChat } = useProjectLayout();
    
    return (
        <div className="flex flex-col items-end gap-4 fixed bottom-20 right-20 z-10 text-white">
            {(toggleChat.chatbot || toggleChat.messages) && (
                <ChatBox>
                    {/* TODO: ChatBox */}
                </ChatBox>
            )}
            <div className="flex flex-row items-center justify-center gap-4">
                <TeamChatButton />
                <ChatBotButton />
            </div>
        </div>
    );
}

function ChatBox({ children }: { children: React.ReactNode }) {
    const { setToggleChat } = useProjectLayout();

    return (
        <div className="rounded-2xl border border-[#645D68]">
            <div className="flex p-4 justify-between bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] rounded-t-2xl border-b border-b-[#645D68]">
                <button className="cursor-pointer" onClick={() => setToggleChat(defaultChatState)}>
                    <X color="white" />
                </button>
            </div>
            <div className="px-4 py-2">
                {children}
                <div className="flex flex-row gap-2 justify-center items-center">
                    <input 
                        type="text" 
                        placeholder="Start Typing..." 
                        className="bg-transparent border border-[#645D68] outline-none rounded-2xl px-4 py-2 text-white"
                    />
                    <button className="cursor-pointer">
                        <SendHorizonal />
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

function TeamChatButton() {
    const { setToggleChat } = useProjectLayout();

    return (
        <button
            onClick={() => setToggleChat((prev) => ({ ...prev, messages: !prev.messages }))}
            className="flex flex-row gap-2 justify-center items-center text-white p-4 rounded-2xl bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] cursor-pointer hover:scale-105 transition-all duration-300 group w-fit"
        >
            <MessageCircle size={40} color="white" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
                Messages
            </span>
        </button>
    );
}

function ChatBotButton() {
    const { setToggleChat } = useProjectLayout();

    return (
        <button
            onClick={() => setToggleChat((prev) => ({ ...prev, chatbot: !prev.chatbot }))}
            className="flex flex-row gap-2 justify-center items-center text-white p-4 rounded-2xl bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] cursor-pointer hover:scale-105 transition-all duration-300 group w-fit"
        >
            <Bot size={40} color="white" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
                help me S.I.S.t.e.r im stuck!
            </span>
        </button>
    );
}

export default ProjectLayout;