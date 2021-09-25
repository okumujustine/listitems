
import { rabbitMQChannelInstance } from '@shared/infra/http/rabbitmq-connection';
import { Request, Response } from 'express';


export class RabbitMQTestController {
    public async test(req: Request, res: Response) {

        const item = {
            itemId: 1,
            userId: "hdtbd34"
        }
        await rabbitMQChannelInstance.sendToQueue('notification', Buffer.from(JSON.stringify(item)));
        // await rabbitMQChannelInstance.close()
        // await rabbitMQConnectionInstance.close()

        return res.status(200).json({ rabbit: true });
    }
}