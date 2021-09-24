import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IItemRepository from "../repositories/IItemRepository";

@injectable()
class DocumentSearchService {
    constructor(
        @inject('ItemRepository')
        private itemRepository: IItemRepository,
    ) { }

    public async searchItemsWhereStatusIsNotGlobal({ userId, query }: { userId: string, query: string }): Promise<any> {
        try {
            const items = await this.itemRepository.findPrivateAndPublicItemsWithSearchQuery({
                userId,
                query
            })
            return items
        } catch (err) {
            throw new AppError("Failed to find items")
        }
    }

    public async searchItemsWhereStatusIsGlobal(query: string): Promise<any> {
        try {
            const items = await this.itemRepository.findGlobalItemsWithSearchQuery(query)
            return items
        } catch (err) {
            throw new AppError("Failed to find items")
        }
    }
}

export { DocumentSearchService }