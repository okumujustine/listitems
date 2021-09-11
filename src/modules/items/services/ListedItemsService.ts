import { inject, injectable } from "tsyringe";
import { ItemStatusEnum } from "../dtos/ItemStatusEnum";
import IItemRepository from "../repositories/IItemRepository";


@injectable()
class ListedItemsService {
    constructor(
        @inject('ItemRepository')
        private itemRepository: IItemRepository,
    ) { }

    public async execute({ token, user }: any) {

        if (!user && !token) {
            const items = await this.itemRepository.findItemsByStatus(ItemStatusEnum.global)
            return items
        }

        const items = await this.itemRepository.findPrivateAndPublicItems(user.id)
        return items
    }
}

export { ListedItemsService }