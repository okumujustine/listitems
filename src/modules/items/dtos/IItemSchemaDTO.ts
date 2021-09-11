
export interface IUserSchema {
    id?: string;
    username: string;
    email: string;
}

export interface IItemSchemaDTO {
    userId: string,
    user: IUserSchema,
    title: string,
    description: string,
    status: string,
    // timestamps: true
}
