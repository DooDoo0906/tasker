import { create } from "zustand";
import { createTask, deleteTask, getTask, getTaskById, updateStatusTask, updateTask } from "@/utils/tasks";
import { User } from "@/types/user";


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
    user?: User | null;
}

export type state = {
    tasks: Task[],
    task: Task,
    dragId: string | null,
    statusDrag: STATUS
}

export type Action = {
    fetchTask: () => void;
    getTaskById: (id: string) => void;
    createTask: (title: string, type: TYPE, description: string, userId?: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, title: string, description: string, type: TYPE, userId?: string) => void;
    updateStatus: (id: string, status: STATUS) => void,
    dragTask: (id: string | null, status: STATUS) => void
}

export const useTaskStore = create<state & Action>()(set => ({
    tasks: [],
    dragId: "",
    task: { id: "", title: "", status: "TODO", type: "NEW" },
    statusDrag: "TODO",
    getTaskById: async (id: string) => {
        set(state => ({
            task: state.tasks.find(task => task.id === id)
        }))
    },
    fetchTask: async () => {
        const fetchTask = (await getTask()).map(item => item);
        set({ tasks: fetchTask })
    },
    createTask: async (title: string, type: TYPE, description?: string, userId?: string) => {
        const taskCreated = await createTask(title, type, description || "", userId);
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
    updateTask: async (id: string, title: string, description: string, type: TYPE, userId?: string) => {
        const updatedTask = await updateTask(id, title, description, type, userId)
        set(state => ({
            tasks: state.tasks.map(task => task.id === updatedTask.id ? { ...task, updateTask } : task)
        }))
    },
    updateStatus: async (id, status) => {
        const statusUpdated = await updateStatusTask(id, status || "TODO")
        set(state => ({
            tasks: state.tasks.map(task => task.id === statusUpdated.id ? { ...task, statusUpdated } : task)
        }))
    },
    dragTask: (id: string | null, status: STATUS) => set(state => ({
        dragId: id,
        statusDrag: status
    }))
}))
