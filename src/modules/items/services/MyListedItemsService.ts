import { inject, injectable } from "tsyringe";
import IItemRepository from "../repositories/IItemRepository";


@injectable()
class MyListedItemsService {
    constructor(
        @inject('ItemRepository')
        private itemRepository: IItemRepository,
    ){}

    public async execute(userId:string) {
        const item = await this.itemRepository.findItemsById(userId)
        return item
    }
}

export { MyListedItemsService }