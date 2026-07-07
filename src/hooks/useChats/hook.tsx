import { useContext } from "react";
import { ChatsContext } from "./context";

function useChats() {
    const context = useContext(ChatsContext)
    if(!context)
        throw new Error("useChats must be used under chat provider")
    return context
}

export default useChats