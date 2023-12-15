import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { createTask, deleteTask, getTask, updateTask } from "@/utils/tasks";


export type STATUS = "INPROGRESS" | "TODO" | "DONE" | "INREVIEW";
export type TYPE = "BUG" | "ENHANCE" | "NEW"
export type TASK_TYPE = "BUG" | "ENHANCE" | "NEW";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: STATUS;
    type: TYPE;
    createdAt?: Date;
    updatedAt?: Date;
}

export type state = {
    tasks: Task[],
}

export type Action = {
    fetchTask: () => void;
    createTask: (title: string, type: TYPE, description?: string,) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, title: string, description: string, status: STATUS, type: TYPE, isUpdate: boolean) => void;
}

export const useTaskStore = create<state & Action>()(set => ({
    tasks: [],
    fetchTask: async () => {
        const fetchTask = (await getTask()).map(item => item);
        set({ tasks: fetchTask })
    },
    createTask: async (title: string, type: TYPE, description?: string) => {
        const taskCreated = await createTask(title, type, description || "");
        set(state => ({
            tasks: [
                ...state.tasks,
                taskCreated
            ]
        }))
    },
    deleteTask: async (id: string) => {
        await deleteTask(id);
        set(state => ({
            tasks: state.tasks.filter(task => task.id !== id)
        }))
    },
    updateTask: async (id: string, title: string, description: string, status: STATUS, type: TYPE, isUpdate: boolean) => {
        if (isUpdate) {
            const updatedTask = await updateTask(id, title, description, status, type)
            set(state => ({
                tasks: [
                    ...state.tasks,
                    updatedTask
                ]
            }))
        }
        else {

        }

    }
}))
