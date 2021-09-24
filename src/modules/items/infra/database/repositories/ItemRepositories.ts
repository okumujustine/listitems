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

    const item = await this.itemMongooseInstance.findById(itemId)
    return item
  }

  public async findItemsByStatus(status: ItemStatusEnum): Promise<IItemDTO[]> {
    const items = await this.itemMongooseInstance.find({ status: status }).sort({ createdAt: -1 })
    return items
  }

  public async updateItemStatus({ id, status }: { id: string, status: ItemStatusEnum }): Promise<IItemDTO> {
    const item = await this.itemMongooseInstance.updateOne(
      { _id: id },
      { $set: { status: status } },
      { runValidators: true }
    )

    return item
  }

  public async checkIfUserIsaHelper({ userId, itemId }: { userId: string, itemId: string }): Promise<IItemDTO> {
    const item = await this.itemMongooseInstance.findOne({
      $and: [
        { _id: itemId },
        { "helpers.useId": userId }
      ]
    })

    return item
  }

  public async addItemHelper({ itemId, helper }: any): Promise<any> {

    const addItemHelper = await this.itemMongooseInstance.updateOne(
      { _id: itemId },
      { $push: { helpers: helper } }
    )

    return addItemHelper
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

  public async findPrivateAndPublicItemsWithSearchQuery({ userId, query }: { userId: string, query: string }): Promise<IItemDTO[]> {

    const finalQuery = new RegExp(query, 'i')

    const items = await this.itemMongooseInstance.find({
      $and: [
        {
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
        },
        {
          $or: [
            { title: { $regex: finalQuery } },
            { description: { $regex: finalQuery } }
          ]
        }
      ]

    }).sort({ createdAt: -1 })

    return items
  }

  public async findGlobalItemsWithSearchQuery(query: string): Promise<IItemDTO[]> {

    let queryParams
    const finalQuery = new RegExp(query, 'i')

    if (query) {
      queryParams = {
        $and: [
          { status: ItemStatusEnum.global },
          {
            $or: [
              { title: { $regex: finalQuery } },
              { description: { $regex: finalQuery } }
            ]
          }
        ]
      }
    } else {
      queryParams = { status: ItemStatusEnum.global }
    }

    const items = await this.itemMongooseInstance.find(queryParams).sort({ createdAt: -1 })

    return items;
  }


}

export default ItemRepository