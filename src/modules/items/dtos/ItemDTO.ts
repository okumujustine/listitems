import { IUserSchema } from "./IItemSchemaDTO";

export interface IItemDTO {
    _id?: string,
    userId: string,
    user: IUserSchema,
    title: string,
    description: string,
    status?: string,
}