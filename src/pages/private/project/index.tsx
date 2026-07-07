import { useLocation } from "react-router"

function ProjectPage() {

    const location = useLocation()
    
    if(location.pathname.includes("paper")){
        return (
            <div className="flex w-full h-full">
                
            </div>
        )
    }

    if(location.pathname.includes("documentation")){
        return (
            <div className="flex w-full h-full">

            </div>
        )
    }

    
}

export default ProjectPage