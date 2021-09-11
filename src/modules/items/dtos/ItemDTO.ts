import { IUserSchema } from "./IItemSchemaDTO";

export interface IItemDTO {
    userId: string,
    user:IUserSchema,
    title: string,
    description:string,
    status?: string,
}