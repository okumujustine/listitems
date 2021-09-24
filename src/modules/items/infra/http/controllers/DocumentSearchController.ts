import { DocumentSearchService } from '@modules/items/services/DocumentSearchService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DocumentSearchController {
    public async loggedInSearch(req: Request & { currentUser?: any }, res: Response) {
        const documentSearchService = container.resolve(DocumentSearchService);
        const userId = req.currentUser.id

        if (!userId) {
            throw new AppError('Method not allowed')
        }

        const { query } = req.body;

        const searchResults = await documentSearchService.searchItemsWhereStatusIsNotGlobal({
            userId,
            query
        })

        res.status(200).send({ searchResults: searchResults })

    }

    public async notLoggedInSearch(req: Request & { currentUser?: any }, res: Response) {
        const documentSearchService = container.resolve(DocumentSearchService);

        const { query } = req.body;

        const searchResults = await documentSearchService.searchItemsWhereStatusIsGlobal(query)

        res.status(200).send({ searchResults })
    }
}