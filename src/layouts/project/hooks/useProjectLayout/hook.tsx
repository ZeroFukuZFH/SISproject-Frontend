import { useContext } from "react"
import { ProjectLayoutContext } from "./context"


function useProjectLayout(){
    const context = useContext(ProjectLayoutContext)
    if(!context) throw new Error("UseProjectLayout must be used within a ProjectLayoutProvider!")
    return context
}

export default useProjectLayout 