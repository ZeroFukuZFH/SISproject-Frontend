import { SendHorizonal } from "lucide-react"
import { type ChangeEvent } from "react";

interface ChatControlsProps {
    onClick: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

function ChatControls({ onClick, onChange, value }: ChatControlsProps){
    return(
        <div className="p-4 border-t border-[#645D68]">
                <div className="flex flex-row gap-2 items-center">
                    <input 
                        value={value}
                        onChange={onChange}
                        type="text" 
                        placeholder="Start Typing..." 
                        className="flex-1 bg-white/5 border border-[#645D68] outline-none rounded-full px-4 py-2 text-white placeholder-white/40 focus:border-purple-500 transition"
                    />
                    <button 
                        onClick={onClick}
                        className="cursor-pointer p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition"
                    >
                        <SendHorizonal size={20} color="white" />
                    </button>
                </div>
            </div>
    )
}

export default ChatControls