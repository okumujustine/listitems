import { IItemDTO } from "@modules/items/dtos/ItemDTO";
import { ItemStatusEnum } from "@modules/items/dtos/ItemStatusEnum";
import IItemRepository from "@modules/items/repositories/IItemRepository";
import ItemModel from "../schema/Item";


class ItemRepository implements IItemRepository {
  private itemMongooseInstance
  constructor() {
    this.itemMongooseInstance = ItemModel;
  }

  public async create(itemData: IItemDTO) {
    const item = await this.itemMongooseInstance.create(itemData)
    return item
  }

  public async findItemsByUserId(userId: string): Promise<IItemDTO[]> {
    const items = await this.itemMongooseInstance.find({ userId }).sort({ createdAt: -1 })
    return items
  }

  public async findItemById(itemId: string): Promise<IItemDTO> {
    const item = await this.itemMongooseInstance.findOne({ _id: itemId }).sort({ createdAt: -1 })
    return item
  }

  public async findItemsByStatus(status: ItemStatusEnum): Promise<IItemDTO[]> {
    const items = await this.itemMongooseInstance.find({ status: status }).sort({ createdAt: -1 })
    return items
  }

  public async updateItemStatus({ id, status }: { id: string, status: ItemStatusEnum }): Promise<IItemDTO> {
    const item = await this.itemMongooseInstance.updateOne(
      { _id: id },
      { $set: { status: status } }
    )

    return item
  }

  public async findPrivateAndPublicItems(userId: string): Promise<IItemDTO[]> {
    const items = await this.itemMongooseInstance.find({
      $or: [
        {
          $and: [
            { userId: userId },
            { status: ItemStatusEnum.private }
          ]
        },
        { status: ItemStatusEnum.global },
        { status: ItemStatusEnum.public },
        { "helpers.useId": userId }
      ]
    }).sort({ createdAt: -1 })

    return items
  }


}

export default ItemRepository