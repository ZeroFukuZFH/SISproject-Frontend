import type { Dispatch, SetStateAction } from "react"

export interface AuthContextType {
    auth: AuthResponse,
    setAuth: Dispatch<SetStateAction<AuthResponse>>
}

export type AuthResponse = {
    accessToken: string,
    refreshToken: string,
    username: string,
    email: string,
}