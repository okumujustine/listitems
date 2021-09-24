import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ItemStatusEnum } from "../dtos/ItemStatusEnum";
import IItemRepository from "../repositories/IItemRepository";


@injectable()
class UpdateItemStatusService {
    constructor(
        @inject('ItemRepository')
        private itemRepository: IItemRepository,
    ) { }

    public async execute({ status, userId, itemId }: { status: ItemStatusEnum, userId: string, itemId: string }) {
        if (!userId) {
            throw new AppError("user must be logged in");
        }

        if (!status || !itemId) {
            throw new AppError("status and item id must be provided");
        }

        if (![ItemStatusEnum.global, ItemStatusEnum.private, ItemStatusEnum.public].includes(status)) {
            throw new AppError("status must be global, private or public");
        }

        const item = await this.itemRepository.findItemById(itemId);
        console.log({
            itemId
        })

        if (!item) {
            throw new AppError("item doesn't exist");
        }

        if (item.userId !== userId) {
            throw new AppError("You don't own this item");
        }

        const updatedItemStatus = await this.itemRepository.updateItemStatus({
            id: item._id,
            status
        })

        return updatedItemStatus
    }
}

export { UpdateItemStatusService }