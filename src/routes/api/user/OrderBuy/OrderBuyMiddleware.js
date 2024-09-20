import { existSmartphoneId } from "../smartPhone/smartPhone.service.js";

const ExistSmartPhonesMiddleware = async (req, res, next) => {
    const data = req.body;
    let existSmartphone = false;
    for (const { smartphone_id } of data.orderSmartphone) {
        existSmartphone = await existSmartphoneId(smartphone_id);
        if (!existSmartphone) {
            console.log(existSmartphone, smartphone_id);

            break;
        }
    }
    if (existSmartphone) {
        next()
    } else {
        return res.status(400).send({ message: "Celular no existente" })
    }
}
export default ExistSmartPhonesMiddleware;