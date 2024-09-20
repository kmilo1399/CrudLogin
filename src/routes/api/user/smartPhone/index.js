import express from "express";
import { getAllSmartphone, getAllSmartphoneUser, newSmartphoneUser, updateSmartphone } from "./smartPhone.service.js";

const routerSmartphone = express.Router({ mergeParams: true });

// * get smartphone for user
routerSmartphone.get("/", async (req, res) => {
    const idUser = req.params.userId;
    const smartPhone = await getAllSmartphoneUser(idUser)
    res.status(200).send(smartPhone)
});




routerSmartphone.get("/all", async (_, res) => {
    const smartPhone = await getAllSmartphone()
    res.status(200).send(smartPhone)
});


/**
 * @typedef newSmartphone
 * @property {{nombre: string, serie:string, precio:string, imagen:string, descripcion:string}} smartphone 
 * 
 */
routerSmartphone.post("/", async (req, res) => {
    /**
     * @type { newSmartphone }
    */
    const data = req.body;
    const idUser = req.params.userId;
    const smartPhone = await newSmartphoneUser(data, idUser)
    res.status(200).send(smartPhone)
});

/**
 * @typedef newSmartphone
 * @property {{nombre: string, serie:string, precio:string, imagen:string, descripcion:string}} smartphone 
 * 
 */
routerSmartphone.put("/:idSmartPhone", async (req, res) => {
    /**
     * @type { newSmartphone }
    */
    const data = req.body;
    const idSmartPhone = req.params.idSmartPhone;
    const smartPhone = await updateSmartphone(data, idSmartPhone)
    res.status(200).send(smartPhone)
});


export default routerSmartphone;