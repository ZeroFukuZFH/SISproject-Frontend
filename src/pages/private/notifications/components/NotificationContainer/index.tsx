import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";

interface NotificationContainerProps {
    title : string;
    children?: ReactNode;
}
function NotificationContainer({title, children}:NotificationContainerProps){
    const [toggle, setToggle] = useState(false)
    return (
        <div className="flex flex-col gap-4 py-2 px-4 w-full text-white">
            <div className="flex flex-row gap-2">
                <h1>{title}</h1> 
                <button onClick={()=> setToggle(prev => !prev)}>
                    {toggle ? (<ChevronDown/>) : (<ChevronUp/>)}
                </button>
            </div>

            {toggle && (children)}

        </div>
    )
}

export default NotificationContainer