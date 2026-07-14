import useProjectLayout from "../hooks/useProjectLayout/hook";
import { X } from "lucide-react";
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

        </div>
    );
}

export default ChatBox