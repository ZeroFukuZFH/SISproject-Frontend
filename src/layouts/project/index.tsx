import { Outlet } from "react-router";

function ProjectLayout(){
    return (
        <main>
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#17161D]">
                <Outlet/>
            </div>
        </main>
    )
}

export default ProjectLayout