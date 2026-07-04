import { type ReactNode } from "react"

function NotificationRequestCard({children}: {children?: ReactNode}){
    return (
        <div className="border border-[#645D68] px-4 py-2 w-full rounded-xl">
            {children}
        </div>
    )
}

export default NotificationRequestCard