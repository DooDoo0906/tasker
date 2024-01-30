import { User } from "./user";

export type STATUS = "INPROGRESS" | "TODO" | "DONE" | "INREVIEW" | "ALL";
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
