import { Button } from "@/components/ui/button";
import { TreePalm } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-full w-full flex flex-col gap-4 items-center justify-center bg-linear-to-r from-[#e0eff1] to-[#7db4b5] border-l-2">
      <div className="flex gap-4 items-center justify-center">
        <TreePalm width={60} height={60} className="text-[#972874]" />
        <p className="text-2xl font-semibold">Linktree-Clone</p>
      </div>
      <Button className="w-[200px] bg-[#680148] hover:bg-[#972874]">
        <Link href="/auth/login">
          Geting Started
        </Link>
      </Button>
    </div>
  )
}