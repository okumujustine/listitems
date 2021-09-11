import { IItemDTO } from "../dtos/ItemDTO";
import { ItemStatusEnum } from "../dtos/ItemStatusEnum";

export default interface IItemRepository {
    create(data: IItemDTO): void;
    findItemsById(id: string): Promise<IItemDTO[]>;
    findItemsByStatus(status: ItemStatusEnum): Promise<IItemDTO[]>;
    findPrivateAndPublicItems(userId: string): Promise<IItemDTO[]>;
}