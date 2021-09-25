import IsAuthenticated from "@modules/users/infra/http/middlewares/IsAuthenticated"
import { requireAuth } from "@modules/users/infra/http/middlewares/RequireAuth"
import { Router } from "express"
import { CreateItemController } from "../controllers/CreateItemController"
import { MyListedItemsController } from "../controllers/MyListedItemsController"
import { ListedItemsController } from "../controllers/ListedItemsController"
import { UpdateItemStatusController } from "../controllers/UpdateItemStatusController"
import { DocumentHelperController } from "../controllers/DocumentHelperController"
import { DocumentSearchController } from "../controllers/DocumentSearchController"
import { RabbitMQTestController } from "../controllers/RabbitMQTestController"

const itemRoutes = Router()

const isAuthenticated = new IsAuthenticated()
const createItemController = new CreateItemController()
const myListedItemsController = new MyListedItemsController()
const listedItemsController = new ListedItemsController()
const updateItemStatusController = new UpdateItemStatusController()
const documentHelperController = new DocumentHelperController()
const documentSearchController = new DocumentSearchController()
const rabbitMQTestController = new RabbitMQTestController()


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

itemRoutes.post(
    '/add_document_helper',
    isAuthenticated.currentUser,
    requireAuth,
    documentHelperController.addHelper
)

itemRoutes.post(
    '/item_search_without_log_in',
    documentSearchController.notLoggedInSearch
)

itemRoutes.post(
    '/item_search_when_logged_in',
    isAuthenticated.currentUser,
    requireAuth,
    documentSearchController.loggedInSearch
)

itemRoutes.post(
    '/rabbit',
    rabbitMQTestController.test
)

itemRoutes.post(
    '/check_user_already_document_helper',
    isAuthenticated.currentUser,
    requireAuth,
    updateItemStatusController.update
)

export default itemRoutes;