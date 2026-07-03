import { type LucideIcon } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";

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

export default ChatButton