"use server"
import { currentUser } from "@clerk/nextjs";
import prisma from '../db'

export const checkUserExistAndCreate = async () => {
    const user = await currentUser();
    const existUser = await getUser(user?.id + "");
    if (!existUser) {
        await createUser();
    }
}


export const getUser = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id: id },
        include: {
            meetings: true,
        }
    })
}


export const getUsers = async () => {
    return (await prisma.user.findMany({
        include: {
            meetings: true
        }
    }));
}

export const createUser = async () => {
    const userFromClerk = await currentUser();
    const createdUser = await prisma.user.create({
        data: {
            id: userFromClerk?.id,
            name: userFromClerk?.lastName + "",
            email: userFromClerk?.emailAddresses[0].emailAddress + "",
            imageUrl: userFromClerk?.imageUrl || ""
        }
    })
    return createdUser;
}

