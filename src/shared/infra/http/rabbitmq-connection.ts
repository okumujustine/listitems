import AppError from "@shared/errors/AppError"
import amqp from "amqplib"

var rabbitMQConnectionInstance: amqp.Connection
var rabbitMQChannelInstance: amqp.Channel

async function rabbitMQConnection() {
    try {
        const url = process.env.RABBITMQ_URL as string
        rabbitMQConnectionInstance = await amqp.connect(url)
        rabbitMQChannelInstance = await rabbitMQConnectionInstance.createChannel()
        await rabbitMQChannelInstance.assertQueue("notification_status_to_viewed")

        console.log("connection rabbitMQ established")
        return { rabbitMQConnectionInstance, rabbitMQChannelInstance }
    } catch (err) {
        throw new AppError("Failed to connect to rabbitMQ")
    }
}
rabbitMQConnection()

export { rabbitMQConnectionInstance, rabbitMQChannelInstance }