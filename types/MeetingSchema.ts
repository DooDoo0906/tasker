import { z } from 'zod';

export const MeetingSchema = z.object({
    title: z.string().min(1, "Please input title of meeting").max(20, "Maximum length of title is 20"),
});

export type MeetingSchemaType = z.infer<typeof MeetingSchema>;
