"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {

    const {
        collapsed,
        onCollapse,
        onExpand
    } = useSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex items-center justify-center pt-3 mb-4 w-full">
                    <Hint 
                        label={label}
                        side="right"
                        asChild
                    >   
                        <Button
                            className="h-auto p-2"
                            variant={"ghost"}
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine className="h-4 w-4"/>
                        </Button>
                    </Hint>
                    
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center justify-center w-full">
                    <p className="font-semibold text-primary">
                        For you
                    </p>
                    <Hint 
                        label={label}
                        side="right"
                        asChild
                    >
                        <Button 
                            className="h-auto p-2 ml-auto"
                            variant={"ghost"}
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine className="h-4 w-4"/>
                        </Button>
                    </Hint>
                    
                </div>
            )}
        </>
     );
}
