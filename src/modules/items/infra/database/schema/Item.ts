import { IItemSchemaDTO } from "@modules/items/dtos/IItemSchemaDTO";
import { ItemStatusEnum } from "@modules/items/dtos/ItemStatusEnum";
import { UserSchema } from "@modules/users/infra/database/schema/User";
import { Schema, model } from "mongoose";

const ItemSchema = new Schema<IItemSchemaDTO>({
    userId: { type: String, required: true },
    user: UserSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(ItemStatusEnum),
        default: ItemStatusEnum.private
    }
}, {
    timestamps: true
})

const ItemModel = model('items', ItemSchema);

export default ItemModel;