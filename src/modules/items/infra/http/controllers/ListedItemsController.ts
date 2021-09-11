import { container } from "tsyringe";
import { Request, Response } from 'express';
import { ListedItemsService } from "@modules/items/services/ListedItemsService";
import JwtService from "@modules/users/services/JwtService";


export class ListedItemsController {
    public async items(req: Request & { currentUser?: any }, res: Response) {
        const listedItems = container.resolve(ListedItemsService);
        const jwtService = container.resolve(JwtService);

        const token = req.session?.jwt
        const user = req.currentUser

        if (token) {
            const user = await jwtService.executeVerify(token)
            const items = await listedItems.execute({ token, user })
            return res.status(200).json({ items });
        }

        const items = await listedItems.execute({ token, user })

        return res.status(200).json({ items });

    }
}