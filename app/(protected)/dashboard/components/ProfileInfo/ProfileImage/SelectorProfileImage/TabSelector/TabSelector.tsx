import { ChevronRight, ImageUp, Trash2 } from "lucide-react";
import { TabSelectorProps } from "./TabSelector.types";

export function TabSelector(props: TabSelectorProps) {
    const { setShowTab } = props;
    return (
        <>
            <div
                className="flex gap-2 justify-between items-center hover:bg-slate-100 p-2 rounded-lg cursor-pointer"
                onClick={() => setShowTab("upload")}
            >
                <div className="flex gap-2">
                    <div className="rounded-lg p-2 h-fit">
                        <ImageUp className="text-[#7db4b5]" strokeWidth={1} />
                    </div>
                    <div>
                        <span className="block font-semibold">Upload your own photo</span>
                        <span className="text-sm text-gray-600">
                            Choose an image from your device
                        </span>
                    </div>
                </div>
                <ChevronRight className="w-4 h-4" />
            </div>
            <div
                className="flex gap-2 justify-between items-center hover:bg-slate-100 p-2 rounded-lg cursor-pointer"
                onClick={() => setShowTab("delete")}
            >
                <div className="flex gap-2">
                    <div className=" rounded-lg p-2 h-fit">
                        <Trash2 className="text-red-600" strokeWidth={1} />
                    </div>
                    <div>
                        <span className="block font-semibold">Delete</span>
                        <span className="text-sm text-gray-600">
                            Delete current image
                        </span>
                    </div>
                </div>
                <ChevronRight className="w-4 h-4" />
            </div>
        </>
    )
}