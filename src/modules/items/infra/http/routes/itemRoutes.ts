import IsAuthenticated from "@modules/users/infra/http/middlewares/IsAuthenticated"
import { requireAuth } from "@modules/users/infra/http/middlewares/RequireAuth"
import { Router } from "express"
import { CreateItemController } from "../controllers/CreateItemController"
import { MyListedItemsController } from "../controllers/MyListedItemsController"
import { ListedItemsController } from "../controllers/ListedItemsController"
import { UpdateItemStatusController } from "../controllers/UpdateItemStatusController"

const itemRoutes = Router()

const isAuthenticated = new IsAuthenticated()
const createItemController = new CreateItemController()
const myListedItemsController = new MyListedItemsController()
const listedItemsController = new ListedItemsController()
const updateItemStatusController = new UpdateItemStatusController()


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



itemRoutes.get(
    '/my_listed_items',
    isAuthenticated.currentUser,
    requireAuth,
    myListedItemsController.items
)

itemRoutes.post(
    '/update_my_item_status',
    isAuthenticated.currentUser,
    requireAuth,
    updateItemStatusController.update
)

export default itemRoutes;