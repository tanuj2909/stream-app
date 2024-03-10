import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
    try{
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: {
                id
            }
        })

        if(!otherUser) throw new Error("User not found");

        if(otherUser.id === self.id) return false;

        const existingBlocked = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id,
                }
            }
        })

        return !!existingBlocked;

    } catch {
        return false;
    }
}

export const blockUser = async (id: string) => {
    const self = await getSelf();

    if(self.id === id) throw new Error("Cannot block yourself!");

    const otherUser = await db.user.findUnique({
        where: {
            id,
        }
    })

    if(!otherUser) throw new Error("Cannot find user!");

    const existingBlocked = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockedId: otherUser.id,
                blockerId:self.id
            }
        }
    })

    if(existingBlocked) throw new Error("Already blocked!");

    const blockedUser = await db.block.create({
        data: {
            blockedId: otherUser.id,
            blockerId: self.id
        },
        include: {
            blocked: true,
        }
    })

    return blockedUser;
}

export const unblockUser = async (id: string) => {
    const self = await getSelf();

    if(self.id === id) throw new Error("Cannot unblock yourself!");

    const otherUser = await db.user.findUnique({
        where: {
            id,
        }
    })

    if(!otherUser) throw new Error("Cannot find user!");

    const existingBlocked = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockedId: otherUser.id,
                blockerId:self.id
            }
        }
    })

    if(!existingBlocked) throw new Error("Already not blocked!");

    const unblockedUser = await db.block.delete({
        where: {
            id: existingBlocked.id,
        },
        include: {
            blocked: true,
        }
    })

    return unblockedUser;
}