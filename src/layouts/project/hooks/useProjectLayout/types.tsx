import {type Dispatch, type SetStateAction} from "react";

export interface ProjectLayoutContextType {
    documentationSettings: DocumentationSettingsState;
    setDocumentationSettings: Dispatch<SetStateAction<DocumentationSettingsState>>;
    toggleChat: ToggleChatState;
    setToggleChat: Dispatch<SetStateAction<ToggleChatState>>
}

export type ToggleChatState = {
    chatbot:boolean;
    messages:boolean;
}

export const defaultChatState: ToggleChatState = {
    chatbot:false,
    messages:false
}

export type DocumentationSettingsState = {
    onThisPage: boolean;
    sister: boolean;
    messages: boolean;
}

export const defaultDocumentationSettings: DocumentationSettingsState = {
    onThisPage: false,
    sister: false,
    messages: false
};