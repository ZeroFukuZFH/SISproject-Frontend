import useProjectLayout from "../hooks/useProjectLayout/hook";
import { X, SendHorizonal } from "lucide-react";
import { defaultChatState } from "../hooks/useProjectLayout/types";

export function ChatBoxHeader({ children }: { children?: React.ReactNode }){
    const { setToggleChat } = useProjectLayout();
    return (
        <div className="flex p-4 justify-between items-center bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] rounded-t-2xl border-b border-[#645D68]">
                {children}
                <button className="cursor-pointer hover:opacity-80 transition" onClick={() => setToggleChat(defaultChatState)}>
                    <X size={20} color="white" />
                </button>
            </div>
    )
}

export function ChatBoxBody({ children }: { children?: React.ReactNode }){
    return (
        <div className="flex-1 overflow-y-auto p-4">
            {children}
        </div>
    )
}

function ChatBox({ children }: { children?: React.ReactNode }) {

    return (
        <div className="rounded-2xl border border-[#645D68] w-100 h-125 flex flex-col overflow-hidden bg-[#17161D]">
            
            {children}

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

export default ChatBox