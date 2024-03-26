"use client";

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";

interface InfoCardProps {
    name: string;
    thumbnailUrl: string | null;
    hostIdentity: string;
    viewerIdentity: string;
};

export const InfoCard = ({
    name,
    thumbnailUrl,
    hostIdentity,
    viewerIdentity
}: InfoCardProps) => {

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    if(!isHost) return null;


    return (
        <div className="px-4">
            <div className="rounded-xl bg-background">
                <div className="flex items-center gap-x-2.5 p-4">
                    <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
                        <Pencil className="h-5 w-5"/>
                    </div>
                    <div>
                        <h2 className="text-sm lg:text-lg font-semibold capitalize">
                            Edit your stream info
                        </h2>
                        <p className="text-muted-foreground text-xs lg:text-sm">
                            Maximize your visibility
                        </p>
                    </div>
                    <InfoModal 
                        initialName={name}
                        initialThumbnailUrl={thumbnailUrl}
                    />
                </div>
                <Separator />
                <div className="p-4 lg:p-6 space-y-4">
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Name
                        </h3>
                        <h3 className="text-sm font-semibold">
                            {name}
                        </h3>
                    </div>
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Thumbnail
                        </h3>
                        <h3 className="text-sm font-semibold">
                            {thumbnailUrl && (
                                <div className="reltive aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                                    <Image 
                                        fill
                                        src={thumbnailUrl}
                                        alt={name}
                                    />
                                </div>
                            )}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}