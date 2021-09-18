import { CreateItemService } from '@modules/items/services/CreateItemService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IUserSharedDTO } from '@shared/dtos/IUserSharedDTO';

export class CreateItemController {

    public async create(req: Request & { currentUser?: any }, res: Response): Promise<Response> {
        const { description, title } = req.body;

        const createItem = container.resolve(CreateItemService);

        const user = req.currentUser as unknown as IUserSharedDTO

        const item = await createItem.execute({
            user,
            userId: user.id as unknown as string,
            description,
            title
        })

        return res.json(item);
    }
}