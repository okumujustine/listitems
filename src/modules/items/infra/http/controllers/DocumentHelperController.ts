import { container } from "tsyringe";
import { Request, Response } from 'express';
import { UpdateItemStatusService } from "@modules/items/services/UpdateItemStatusService";
import AppError from "@shared/errors/AppError";
import { DocumentHelperService } from "@modules/items/services/DocumentHelperService";


export class DocumentHelperController {
    public async addHelper(req: Request & { currentUser?: any }, res: Response) {

        const documentHelperService = container.resolve(DocumentHelperService);

        const { helper, itemId } = req.body;

        const currentUserId = req.currentUser?.id! as string;

        if (!currentUserId) {
            throw new AppError('User must be logged in');
        }

        if (!helper) {
            throw new AppError('Helper is required');
        }
        if (!itemId) {
            throw new AppError('Item id is required');
        }

        const item = await documentHelperService.findItemById(itemId);

        if (item.userId !== currentUserId) {
            throw new AppError('You do not own this item');
        }

        const userIsAHelper = await documentHelperService.checkIfUserIsaHelper({
            userId: currentUserId,
            itemId
        });

        if (userIsAHelper) {
            throw new AppError(`${helper.username} is already a helper`);
        }

        const itemHelperAdded = await documentHelperService.executeAddItemHelper({
            helper,
            itemId
        })

        //update the notification to approved

        return res.status(200).send({ helper: "document helper successfully addded" });

    }
}