import { TreePalm } from "lucide-react"

export function LoaderProfile() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-2">
            <TreePalm className="w-20 h-20 text-gray-600" strokeWidth={1} />
            <div className="loader bg-gray-100 p-5 rounded-full flex space-x-3">
                <div className="w-5 h-5 bg-gray-700 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-700 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-700 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-700 rounded-full animate-bounce"></div>
            </div>
        </div>
    )
}