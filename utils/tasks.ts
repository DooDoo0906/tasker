"use server"
import { STATUS, TYPE } from '@/lib/task-store';
import prisma from '../db'
import { v4 as uuid } from "uuid";


export const getTask = async () => {
    return await prisma.task.findMany();
}


export const createTask = async (title: string, type: TYPE, description: string,) => {
    const task = await prisma.task.create({
        data: {
            id: uuid(),
            title,
            type,
            description,
            status: "TODO",
        }
    })
    return task;
}

export const deleteTask = async (id: string) => {
    const deleteTask = await prisma.task.delete({
        where: {
            id
        }
    })
    return;
}

export const updateTask = async (id: string, title?: string, description?: string, status?: STATUS, type?: TYPE) => {
    const updateTask = await prisma.task.update({
        where: {
            id,
        },
        data: {
            id,
            title,
            description,
            status,
            type,
        }
    });
    return updateTask;
}

export const updateStatusTask = async (id: string, status: STATUS) => {
    const updateTaskSts = await prisma.task.update({
        where: {
            id,
        },
        data: {
            id,
            status,
        }
    });
    return updateTaskSts;
}


