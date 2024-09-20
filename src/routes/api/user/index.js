import express from "express";
import routerSmartphone from "./smartPhone/index.js";
import routerOrderBuy from "./orderBuy/index.js";
import routerLogout from "../logout/index";

const routerUser = express.Router();
routerUser.use('/:userId/orderBuy', routerOrderBuy);
routerUser.use('/:userId/smartphone', routerSmartphone);
routerUser.use('/:userId/logout', routerLogout);
export default routerUser 