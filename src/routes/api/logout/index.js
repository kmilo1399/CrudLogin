import express from "express";
import { InsertLogout } from "./logout.services.js";
import { newLogoutValidator } from "./Logout.validator.js";
import ExistLogoutMiddleware from "./logoutMiddleware.js";


const routerLogout = express.Router();

routerLogout.post("/", [newLogoutValidator], ExistLogoutMiddleware, async (req, res) => {
    const username = req.params.username;
    /**
     * @type { RequestBody }
     */

    const { order_status: orderStatus, orderSmartphone } = req.body;
    await InsertLogout(username, orderStatus, orderSmartphone)

    res.status(200).send({ message: "User create successful" })
})


export default routerLogout;