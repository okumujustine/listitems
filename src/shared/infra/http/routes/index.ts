
import itemRoutes from "@modules/items/infra/http/routes/itemRoutes"
import {Router} from "express"

const routes = Router()

routes.use("/listed_items", itemRoutes)

export default routes