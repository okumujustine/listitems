import { inject, injectable } from "tsyringe";
import { IItemDTO } from "../dtos/ItemDTO";
import IItemRepository from "../repositories/IItemRepository";


@injectable()
class CreateItemService {
    constructor(
        @inject('ItemRepository')
        private itemRepository: IItemRepository,
    ){}

    public async execute(itemData: IItemDTO): Promise<any> {
        const item = await this.itemRepository.create(itemData)
        return item
    }
}

export { CreateItemService }