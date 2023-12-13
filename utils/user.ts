"use server"
import { PrismaClient, Prisma } from "@prisma/client";
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
        where: { id: id }
    })
}


export const createUser = async () => {
    const userFromClerk = await currentUser();
    const createdUse = await prisma.user.create({
        data: {
            id: userFromClerk?.id,
            name: userFromClerk?.lastName + "",
            email: userFromClerk?.emailAddresses[0].emailAddress + "",
            tasks: {},
        }
    })
    return createdUse;
}

