import { Outlet } from "react-router";
import LandingSidebar from "./components/LandingSidebar";

function LandingLayout(){
    return (
        <main className="bg-[#17161D] w-screen h-screen">
            <div className="flex flex-col mx-10 border border-x-[#423D44] h-full">
                <div className="w-full border border-b-[#423D44] h-10"/>
                <div className="h-full w-full flex flex-row">
                    <LandingSidebar/>
                    <Outlet/>
                </div>
            </div>
        </main>
    )
}

export default LandingLayout