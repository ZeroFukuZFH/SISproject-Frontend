import { ChevronDown } from "lucide-react";
import useProjectLayout from "../hooks/useProjectLayout/hook";
import { useState, type ChangeEvent } from "react";

function DocumentationSettings() {
    const { setDocumentationSettings } = useProjectLayout()
    const [isExpanded, setIsExpanded] = useState(true);
    
    const handleDocumentationSettings = (e: ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target
        setDocumentationSettings(prev => ({...prev,[name]: e.target.checked}))
    }
    return (
        <div className="p-6 rounded-2xl flex flex-col gap-4 border border-[#645D68] text-white max-w-60">
            <div 
                className="flex flex-row gap-2 items-center justify-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h1 className="text-xl font-bold mb-4">Documentation Settings</h1>
                <button className={`transition-transform duration-300 cursor-pointer ${isExpanded ? '-rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                </button>
            </div>

            <div className={`grid transition-all duration-300 ease-in-out ${
                isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}>
                <div className="overflow-hidden">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="onThisPage" onChange={handleDocumentationSettings}/>
                            <span>enable "on this page"</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="sister" onChange={handleDocumentationSettings}/>
                            <span>enable S.I.S.t.e.r</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="messages" onChange={handleDocumentationSettings}/>
                            <span>enable Messages</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentationSettings