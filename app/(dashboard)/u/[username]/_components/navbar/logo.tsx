import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    return <Link href={"/"}>
        <div className="flex items-center justify-center gap-x-1 hover:opacity-75 transition">
            <div className="rounded-full shrink-0">
                <Image 
                    src={"/stream.svg"}
                    alt="stream"
                    height={"50"}
                    width={"50"}
                    className="flex items-center justify-center"
                />
            </div>
            <div>
                <p className={cn(font.className, "hidden lg:block text-lg font-semibold")}>Stream</p>
                <p className="text-xs text-muted-foreground">
                    Creator Dasboard
                </p>
            </div>
        </div>
    </Link>
}