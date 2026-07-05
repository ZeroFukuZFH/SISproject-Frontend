import { useState, type ReactNode } from "react";
import { LandingLayoutContext } from "./context";

function LandingProvider({ children }:{ children: ReactNode }){
    const [togglePopup, setTogglePopup] = useState(false)
    const handleTogglePopUp = () => {
        setTogglePopup(prev => !prev)
    }

    const [toggleSignOut, setToggleSignOut] = useState(false)
    const handleToggleSignOut = () => {
        setToggleSignOut(prev => !prev)
    }
    return (
        <LandingLayoutContext.Provider value={{
            togglePopup, 
            handleTogglePopUp,
            toggleSignOut, 
            handleToggleSignOut
        }}>
            {children}
        </LandingLayoutContext.Provider>
    )
}

export default LandingProvider