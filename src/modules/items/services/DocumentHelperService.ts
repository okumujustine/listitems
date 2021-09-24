import AppError from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import IItemRepository from "../repositories/IItemRepository"

@injectable()
class DocumentHelperService {
    constructor(
        @inject('ItemRepository')
        private itemRepository: IItemRepository,
    ) { }

    public async findItemById(id: string): Promise<any> {
        try {
            const item = await this.itemRepository.findItemById(id)
            return item
        } catch (err) {
            throw new AppError("Failed to find item")
        }
    }

    public async checkIfUserIsaHelper({ userId, itemId }: { userId: string, itemId: string }): Promise<any> {
        try {
            const item = await this.itemRepository.checkIfUserIsaHelper({
                userId,
                itemId
            })
            return item
        } catch (err) {
            throw new AppError("Failed to find item")
        }
    }

    public async executeAddItemHelper({ itemId, helper }: any): Promise<any> {
        try {
            const item = await this.itemRepository.addItemHelper({
                helper,
                itemId
            })
            return item
        } catch (err) {
            throw new AppError("Failed to add item helper, try again later")
        }
    }
}

export { DocumentHelperService }