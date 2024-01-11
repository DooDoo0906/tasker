"use server"
import { STATUS, TYPE } from '@/lib/task-store';
import prisma from '../db'
import { v4 as uuid } from "uuid";
import { Prisma } from '@prisma/client';


export const getTask = async () => {
    return await prisma.task.findMany(
        {
            include: {
                user: true,
            }
        }
    );
}

export const getTaskById = async (id: string) => {
    return await prisma.task.findUnique(
        {
            where: { id: id },
            include: {
                user: true
            }
        }
    );
}


export const createTask = async (title: string, type: TYPE, description: string, userId?: string) => {
    let taskCreate: Prisma.TaskCreateInput;
    if (userId) {
        taskCreate =
        {
            id: uuid(),
            title,
            type,
            description,
            status: "TODO",
            user: {
                connect: { id: userId },
            },
        }
    }
    else {
        taskCreate = {
            id: uuid(),
            title,
            type,
            description,
            status: "TODO",
        }
    }
    const task = await prisma.task.create({
        data: taskCreate
    })
    return task;
}

export const deleteTask = async (id: string) => {
    const deleteTask = await prisma.task.delete({
        where: {
            id
        }
    })
    return deleteTask;
}

export const updateTask = async (id: string, title?: string, description?: string, type?: TYPE, userId?: string) => {
    const dataUpdate = !userId ? {
        id,
        title,
        description,
        type,
        user: {
            connect: { id: userId },
        },
    } : {
        id,
        title,
        description,
        type,

    }
    const updateTask = await prisma.task.update({
        where: {
            id,
        },
        data: dataUpdate
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

export const searchTaskByKeyWord = async (searchVal: string) => {
    const searchResult = await prisma.task.findMany({
        where: {
            title: {
                contains: searchVal,
                mode: 'insensitive',
            }
        }
    });
    return searchResult;
}

export const filterTask = async (status: STATUS) => {
    const searchResult = await prisma.task.findMany({
        where: {
            status: {
                equals: status
            }
        }
    });
    return searchResult;
}

