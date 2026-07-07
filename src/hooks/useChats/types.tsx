
export type ChatsContextType = {
    handleDisconnect: () => Promise<void>
    handleSendMessage: (currentTeamId: number, sender: string,message: string) => void
}


