import { Meeting } from "@/types/meeting";
import { createMeetings, getMeetingsByUserId } from "@/utils/meetings";
import { create } from "zustand";


export type state = {
    meetings: Meeting[],
    meeting: Meeting,
}

export type Action = {
    fetchMeeting: () => void;
    createMeeting: (title: string) => void;
    getMeetingById: (id: string) => void;
}

export const useMeetingStore = create<state & Action>()(set => ({
    meetings: [],
    meeting: { id: "", title: "", start: new Date(), end: new Date() },
    getMeetingById: async (id: string) => {
        set(state => ({
            meeting: state.meetings.find(meet => meet.id === id)
        }))
    },
    fetchMeeting: async () => {
        const fetchMeeting = (await getMeetingsByUserId()).map(item => item);
        set({ meetings: fetchMeeting })
    },
    createMeeting: async (title: string) => {
        const createdMeet = (await createMeetings(title));
        set(state => ({ meetings: [...state.meetings, createdMeet] }))
    }
}))
