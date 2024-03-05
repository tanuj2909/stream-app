import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    return <div className="flex flex-col items-center my-8 gap-y-4">
        <p className={cn(font.className, "text-4xl font-semibold")}>
            Stream
        </p>
        <div className="rounded-full p-2">
            <Image 
                src={"/stream.svg"}
                alt="Stream"
                height={"80"}
                width={"80"}
            />
        </div>
    </div>
}