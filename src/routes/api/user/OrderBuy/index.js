
import express from "express";
import { getOrderBuy, getOrderBuyForUser, getOrderBuyForUserAndOrder, InsertOrderBuy } from "./OrderBuy.services.js";
import { newOrderValidator } from "./OrderBuy.validator.js";
import ExistSmartPhonesMiddleware from "./OrderBuyMiddleware.js";
/**
 * @typedef {Object} RequestBody
 * @property {"OK"|"CANCEL"} order_status
 * @property {{quantity:number, smartphone_id:number, order_id:number }[]} orderSmartphone - La edad de la persona.
 */
const routerOrderBuy = express.Router({ mergeParams: true });

routerOrderBuy.post("/", [newOrderValidator], ExistSmartPhonesMiddleware, async (req, res) => {
    const idUser = req.params.userId;
    /**
     * @type { RequestBody }
     */

    const { order_status: orderStatus, orderSmartphone } = req.body;
    await InsertOrderBuy(idUser, orderStatus, orderSmartphone)

    res.status(200).send({ message: "User generated successful" })
})

routerOrderBuy.get("/", async (req, res) => {
    const idUser = req.params.userId;

    const { limit, page } = req.query;

    const dataOrderBuyUser = await getOrderBuyForUser(idUser, limit, page)

    res.status(200).send(dataOrderBuyUser)
})
routerOrderBuy.get("/orders", async (req, res) => {
    const { limit, page } = req.query;

    const dataOrderBuy = await getOrderBuy(limit, page)

    res.status(200).send(dataOrderBuy)
})

routerOrderBuy.get("/:orderId", async (req, res) => {
    const { userId, orderId } = req.params;
    const dataOrderBuyUser = await getOrderBuyForUserAndOrder(userId, orderId)

    res.status(200).send(dataOrderBuyUser)
})

export default routerOrderBuy 