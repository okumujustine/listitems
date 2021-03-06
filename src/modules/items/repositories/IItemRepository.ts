import { IItemDTO } from "../dtos/ItemDTO";
import { ItemStatusEnum } from "../dtos/ItemStatusEnum";

export default interface IItemRepository {
    create(data: IItemDTO): void;
    findItemsByUserId(id: string): Promise<IItemDTO[]>;
    findItemById(id: string): Promise<IItemDTO>;
    findItemsByStatus(status: ItemStatusEnum): Promise<IItemDTO[]>;
    findPrivateAndPublicItems(userId: string): Promise<IItemDTO[]>;
    updateItemStatus(IdAndStatus: { id: string | undefined, status: ItemStatusEnum }): Promise<IItemDTO>;
    checkIfUserIsaHelper({ userId, itemId }: { userId: string, itemId: string }): Promise<IItemDTO>;
    addItemHelper({ itemId, helper }: any): Promise<any>;
    findPrivateAndPublicItemsWithSearchQuery({ userId, query }: { userId: string, query: string }): Promise<IItemDTO[]>;
    findGlobalItemsWithSearchQuery(query: string): Promise<IItemDTO[]>;
}