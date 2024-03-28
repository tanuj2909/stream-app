"use client";

import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Hint } from "../hint";
import { Textarea } from "../ui/textarea";
import { ElementRef, useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
    initialBio: string | null;
}
export const BioModal = ({
    initialBio
}: BioModalProps) => {

    const closeRef = useRef<ElementRef<"button">>(null);
    const [value, setValue] = useState(initialBio || "");
    const [isPending, startTransition] = useTransition();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    toast.success("User bio updated!");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong!"))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"link"}
                    size={"sm"}
                    className="ml-auto"
                >Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>
                <form 
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <Textarea 
                        placeholder="User bio"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        className="resize-none"
                        disabled={isPending}
                    />
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button
                                type="button"
                                variant={"ghost"}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}