import {  useState } from "react"
import { type DocumentationSettingsState, defaultDocumentationSettings, defaultChatState, type ToggleChatState } from "./types"
import { ProjectLayoutContext } from "./context"

function ProjectLayoutProvider({children}: { children: React.ReactNode }){
    const [toggleChat,setToggleChat] = useState<ToggleChatState>(defaultChatState)
    const [documentationSettings, setDocumentationSettings] = useState<DocumentationSettingsState>(defaultDocumentationSettings)

    return (
        <ProjectLayoutContext.Provider value={{toggleChat,setToggleChat,documentationSettings,setDocumentationSettings}}>
            {children}
        </ProjectLayoutContext.Provider>
    )
}

export default ProjectLayoutProvider