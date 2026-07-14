import { createContext } from "react"
import { type ProjectLayoutContextType } from "./types"

export const ProjectLayoutContext = createContext<ProjectLayoutContextType | undefined>(undefined)