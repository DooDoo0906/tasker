import { z } from 'zod';

export const TaskSchema = z.object({
    title: z.string().min(1, "Please input title of task").max(20, "Maximum length of title is 20"),
    description: z.string().min(1, "Please input description of task"),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
