import type { Dispatch, SetStateAction } from "react"
import type { AuthResponse } from "../../services/authService"
export interface AuthContextType {
    auth: AuthResponse,
    setAuth: Dispatch<SetStateAction<AuthResponse>>
}