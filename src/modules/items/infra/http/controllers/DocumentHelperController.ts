import { container } from "tsyringe";
import { Request, Response } from 'express';
import { UpdateItemStatusService } from "@modules/items/services/UpdateItemStatusService";
import AppError from "@shared/errors/AppError";
import { DocumentHelperService } from "@modules/items/services/DocumentHelperService";
import { rabbitMQChannelInstance } from "@shared/infra/http/rabbitmq-connection";


export class DocumentHelperController {
    public async addHelper(req: Request & { currentUser?: any }, res: Response) {

        const documentHelperService = container.resolve(DocumentHelperService);

        const { helper, itemId, notificationId } = req.body;

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

        await documentHelperService.executeAddItemHelper({
            helper,
            itemId
        })

        //update the notification to approved
        try {

            await rabbitMQChannelInstance.sendToQueue('notification_status_to_viewed', Buffer.from(JSON.stringify({ id: notificationId })));
            return res.status(200).send({ helper: "document helper successfully addded" });

        } catch (err) {
            return res.status(200).send({ helper: "document helper successfully addded, notification status will propagate later" });
        }

    }
}