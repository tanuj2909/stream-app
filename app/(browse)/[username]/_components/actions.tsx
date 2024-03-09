"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onunfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {

    const  [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Somthing went wrong!"))

        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onunfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Somthing went wrong!"))

        })
    }

    const onClick = () => {
        if(isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }
    return(
        
        <Button 
            disabled={isPending} 
            onClick={onClick} 
            variant={isFollowing ? 'ghost' : 'primary'}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}