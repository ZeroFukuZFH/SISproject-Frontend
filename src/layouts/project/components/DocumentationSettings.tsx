import { ChevronDown } from "lucide-react";

function DocumentationSettings() {
    return (
        <div className="p-6 rounded-2xl flex flex-col gap-4 border border-[#645D68] text-white max-w-60">
            <div className="flex flex-row gap-2 items-center justify-center">
                <h1 className="text-xl font-bold mb-4">Documentation Settings</h1>
                <button>
                    <ChevronDown />
                </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span>enable "on this page"</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span>enable S.I.S.t.e.r</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span>enable Messages</span>
            </label>
        </div>
    );
}

export default DocumentationSettings