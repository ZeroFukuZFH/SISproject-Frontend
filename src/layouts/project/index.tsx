import { Bot, MessageCircle } from "lucide-react";
import { Outlet } from "react-router";

function ProjectLayout(){
    return (
        <main>
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#17161D]">
                <Outlet/>
                <div className="flex flex-row items-center justify-center gap-4 fixed bottom-20 right-20">
                    <TeamChatButton/>
                    <ChatBotButton/>
                </div>
            </div>
        </main>
    )
}

function TeamChatButton(){
    return (
        <button className="flex flex-row gap-2 justify-center items-center text-white p-4 rounded-2xl bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] cursor-pointer hover:scale-105 transition-all duration-300 group w-fit"> 
            <MessageCircle size={40} color="white"/>
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
                Messages
            </span>
        </button>
    )
}

function ChatBotButton(){
    return (
        <button className="flex flex-row gap-2 justify-center items-center text-white p-4 rounded-2xl bg-linear-to-r from-[#FF0D00] via-[#B50F6D] to-[#6C1CD7] cursor-pointer hover:scale-105 transition-all duration-300 group w-fit"> 
            <Bot size={40} color="white"/> 
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
                help me S.I.S.t.e.r im stuck!
            </span>
        </button>
    )
}
export default ProjectLayout