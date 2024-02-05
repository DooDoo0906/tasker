"use server"
import prisma from '../db'
import { v4 as uuid } from "uuid";
import { currentUser } from "@clerk/nextjs";


export const getMeetingsByUserId = async () => {
    const user = await currentUser();
    const meetings = await prisma.meeting.findMany({
        where: {
            users: {
                some: {
                    userId: user?.id.trim()
                }
            }
        }
    })
    return meetings;
}

export const createMeetings = async (title: string) => {
    const user = await currentUser();
    const createdMeeting = await prisma.meeting.create({
        data: {
            id: uuid(),
            title: title,
            start: new Date(),
            users: {
                create: [{
                    user: {
                        connect: {
                            id: user?.id.trim(),
                        }
                    }
                }]
            }
        }
    })

    return createdMeeting;
}
