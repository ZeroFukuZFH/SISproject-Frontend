import { createContext } from "react";
import type { ChatsContextType } from "./types";

export const ChatsContext = createContext<ChatsContextType | undefined>(undefined)