import DocumentationSettings from "./components/DocumentationSettings";
import { Outlet } from "react-router";
import ProjectLayoutProvider from "./hooks/useProjectLayout/provider";
import ChatContainer from "./components/ChatContainer";

function ProjectLayout() {
    return (
        <main>
            <ProjectLayoutProvider>
                <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#17161D]">
                    <Outlet />

                    <div className="flex flex-row items-center justify-center gap-4 fixed bottom-20 left-20 z-10">
                        <DocumentationSettings />
                    </div>

                    <ChatContainer />
                </div>
            </ProjectLayoutProvider>
        </main>
    );
}

export default ProjectLayout;