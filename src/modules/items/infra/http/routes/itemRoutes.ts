import IsAuthenticated from "@modules/users/infra/http/middlewares/IsAuthenticated"
import { requireAuth } from "@modules/users/infra/http/middlewares/RequireAuth"
import { Router } from "express"
import { CreateItemController } from "../controllers/CreateItemController"
import { MyListedItemsController } from "../controllers/MyListedItemsController"
import { ListedItemsController } from "../controllers/ListedItemsController"

const itemRoutes = Router()

const isAuthenticated = new IsAuthenticated()
const createItemController = new CreateItemController()
const myListedItemsController = new MyListedItemsController()
const listedItemsController = new ListedItemsController()


itemRoutes.get(
    '/listed_items',
    listedItemsController.items
)

itemRoutes.post(
    '/post',
    isAuthenticated.currentUser,
    requireAuth,
    createItemController.create
)

itemRoutes.get(
    '/my_listed_items',
    isAuthenticated.currentUser,
    requireAuth,
    myListedItemsController.items
)

export default itemRoutes;