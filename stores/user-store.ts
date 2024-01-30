import { create } from "zustand";
import { getUsers } from "@/utils/users";
import { User } from "@/types/user";

export type state = {
    users: User[],
}

export type Action = {
    fetchUser: () => void;
}

export const useUserStore = create<state & Action>()(set => ({
    users: [],
    fetchUser: async () => {
        const fetchUser = (await getUsers()).map(item => item);
        set({ users: fetchUser })
    },
}))
