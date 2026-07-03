import { useState } from "react"

function useLandingLayout(){
    const [togglePopup, setTogglePopup] = useState(false)
    const handleToggle = () => {
        setTogglePopup(prev => !prev)
    }

    return {
        togglePopup,
        handleToggle
    }
}

export default useLandingLayout