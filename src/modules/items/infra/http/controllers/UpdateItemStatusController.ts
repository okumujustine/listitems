import { container } from "tsyringe";
import { Request, Response } from 'express';
import { UpdateItemStatusService } from "@modules/items/services/UpdateItemStatusService";
import AppError from "@shared/errors/AppError";


export class UpdateItemStatusController {
    public async update(req: Request & { currentUser?: any }, res: Response) {
        const { status, itemId } = req.body;
        const updateItemStatusService = container.resolve(UpdateItemStatusService);

        const currentUserId = req.currentUser?.id! as string;

        const item = await updateItemStatusService.execute({ userId: currentUserId, status, itemId });
        return res.status(200).json(item);

    }
}