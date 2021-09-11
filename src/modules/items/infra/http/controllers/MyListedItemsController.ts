import { MyListedItemsService } from "@modules/items/services/MyListedItemsService";
import { container } from "tsyringe";
import { Request, Response } from 'express';


export class MyListedItemsController{
    public async items(req: Request & {currentUser?:any}, res: Response) {
        const myListedItems = container.resolve(MyListedItemsService);
         
         const item = await myListedItems.execute(req.currentUser.id);
 
         return res.status(200).json(item);
    }
}