import { create } from "zustand";
import { getUser, getUsers } from "@/utils/user";

export type User = {
    id: string;
    email: string;
    name: string | null;
    imageUrl: string | null;
}



export type state = {
    users: User[],
}

export type Action = {
    fetchUser: () => void;
    // createTask: (title: string, description: string, userId?: string) => void;
    // deleteTask: (id: string) => void;
    // updateTask: (id: string, title: string, description: string, status: STATUS, type: TYPE) => void;

}

export const useUserStore = create<state & Action>()(set => ({
    users: [],
    fetchUser: async () => {
        const fetchUser = (await getUsers()).map(item => item);
        set({ users: fetchUser })
    },
    // createTask: async (title: string, description?: string, userId?: string) => {
    //     const taskCreated = await createTask(title, description || "", userId);
    //     set(state => ({
    //         tasks: [
    //             ...state.tasks,
    //             taskCreated
    //         ]
    //     }))
    // },
    // deleteTask: async (id: string) => {
    //     await deleteTask(id);
    //     set(state => ({
    //         tasks: state.tasks.filter(task => task.id !== id)
    //     }))
    // },
    // updateTask: async (id: string, title: string, description: string) => {
    //     const updatedTask = await updateTask(id, title, description, status, type)
    //     set(state => ({
    //         tasks: state.tasks.map(task => task.id === updatedTask.id ? { ...task, updateTask } : task)
    //     }))
    // },
}))
