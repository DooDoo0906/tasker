import { Meeting } from "@/types/meeting";
import { getMeetingsByUserId } from "@/utils/meetings";
import { create } from "zustand";


export type state = {
    meetings: Meeting[],
}

export type Action = {
    fetchMeeting: () => void;
}

export const useMeetingStore = create<state & Action>()(set => ({
    meetings: [],
    fetchMeeting: async () => {
        const fetchMeeting = (await getMeetingsByUserId()).map(item => item);
        set({ meetings: fetchMeeting })
    },
}))
