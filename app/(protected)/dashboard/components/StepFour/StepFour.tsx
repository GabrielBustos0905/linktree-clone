import Image from "next/image";
import { stepFourDataImages } from "./StepFour.data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import axios from "axios";
import { useStepConfig } from "@/hooks/use-step-config";
import { Plus } from "lucide-react";
import { toast } from "sonner"

export function StepFour() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const { setInfoUser, nextStep, infoUser } = useStepConfig();

    const handleImageSelected = (src: string) => {
        setSelectedPhoto(src);
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            image: src
        }))
    };

    const handleContinue = async () => {
        if (!username) {
            setUsernameError("Username is required!")
            return;
        };
        setUsernameError("")
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            name,
            username
        }));

        try {
            const response = await axios.post("/api/user", {
                name: name,
                username: username,
                image: infoUser.image,
                links: infoUser.platforms,
                typeUser: infoUser.typeUser
            });

            if (response.status === 200) nextStep()
        } catch (error) {
            setUsernameError("Choose another username")
            toast.error("Username already Exist")
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className="text-center font-semibold text-2xl text-[#7db4b5]">
                Add profile details
            </h2>
            <p className="text-center">Select yout profile image or upload it.</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-4 items-center">
                {
                    stepFourDataImages.map(({ src }) => (
                        <div
                            key={src}
                            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer ${selectedPhoto === src ? "bg-[#7db4b5]" : "hover:bg-[#e0eff1]"}`}
                            onClick={() => handleImageSelected(src)}
                        >
                            <Image
                                src={src}
                                alt="profile"
                                className="rounded-full"
                                width={300}
                                height={300}
                            />
                        </div>
                    ))
                }
                {
                    photoUrl && (
                        <div
                            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer ${selectedPhoto === photoUrl ? "bg-[#7db4b5]" : "hover:bg-[#e0eff1]"}`}
                            onClick={() => handleImageSelected(photoUrl)}
                        >
                            <Image
                                src={photoUrl}
                                alt="profile"
                                className="rounded-full object-cover aspect-square"
                                width={300}
                                height={300}
                            />
                        </div>
                    )
                }
                {
                    showUploadPhoto ? (
                        <UploadButton
                            className="rounded-full text-slate-800 bg-slate-200 h-full"
                            endpoint="profileImage"
                            onClientUploadComplete={(res) => {
                                setPhotoUrl(res[0].url)
                                setShowUploadPhoto(false)
                            }}
                            onUploadError={(error: Error) => console.log(error)}
                        />
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center hover:bg-slate-100 h-full rounded-full cursor-pointer border"
                            onClick={() => setShowUploadPhoto(!showUploadPhoto)}
                        >
                            <Plus className="w-7 h-7" />
                        </div>
                    )
                }
            </div>
            <div className="mt-5">
                <h3 className="text-lg my-3 text-center">Add your Username</h3>
                <div className="grid gap-4">
                    <Input
                        placeholder="Name"
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Username"
                        className="w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {
                        usernameError !== "" && <span className="text-sm text-red-400">{usernameError}</span>
                    }
                </div>
            </div>
            <div className="mt-6">
                <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={handleContinue}>Continue</Button>
            </div>
        </div>
    )
}